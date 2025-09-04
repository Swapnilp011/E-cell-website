'use server';

import {
  leadershipTestimonialImprovements,
  type LeadershipTestimonialImprovementsInput,
  type LeadershipTestimonialImprovementsOutput,
} from '@/ai/flows/leadership-testimonial-improvements';
import { z } from 'zod';
import admin from '@/lib/firebase/admin';
import { getAuth } from 'firebase-admin/auth';
import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';

// Testimonial improvement schema and state
const testimonialSchema = z.object({
  testimonial: z.string().min(20, {
    message: 'Testimonial must be at least 20 characters long.',
  }),
});

export type TestimonialFormState = {
  message: string;
  errors?: {
    testimonial?: string[];
  };
  data?: LeadershipTestimonialImprovementsOutput;
};

export async function getLeadershipSuggestions(
  prevState: TestimonialFormState,
  formData: FormData
): Promise<TestimonialFormState> {
  const validatedFields = testimonialSchema.safeParse({
    testimonial: formData.get('testimonial'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Please correct the errors below.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const input: LeadershipTestimonialImprovementsInput = {
      testimonialContent: validatedFields.data.testimonial,
    };
    const result = await leadershipTestimonialImprovements(input);
    return {
      message: 'Success',
      data: result,
    };
  } catch (error) {
    console.error(error);
    return {
      message:
        'An unexpected error occurred on the server. Please try again later.',
    };
  }
}

// Registration schema and state
const registerSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  college: z
    .string()
    .min(2, { message: 'College name must be at least 2 characters' }),
  department: z.string().min(1, { message: 'Please enter a department' }),
  div: z.string().regex(/^[a-zA-Z0-9]+$/, { message: 'Division must be alphanumeric' }),
  year: z.string().min(1, { message: 'Please select your year of study' }),
});

export type RegisterFormState = {
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    college?: string[];
    department?: string[];
    div?: string[];
    year?: string[];
    general?: string[];
  };
  success: boolean;
};

export async function registerUser(
  prevState: RegisterFormState,
  formData: FormData
): Promise<RegisterFormState> {
  const validatedFields = registerSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      message: 'Please correct the errors below.',
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  const { email, password, name, college, department, div, year } =
    validatedFields.data;

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name,
    });
    
    // Now, save the rest of the user's details to Firestore
    const db = admin.firestore();
    await db.collection('users').doc(userRecord.uid).set({
      name,
      email,
      college,
      department,
      division: div,
      yearOfStudy: year,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return { message: 'User registered successfully!', success: true };
  } catch (error: any) {
    console.error('Firebase Admin Error:', error);
    let errorMessage = 'An unexpected error occurred. Please try again.';
    if (error.code === 'auth/email-already-exists') {
      errorMessage = 'This email address is already in use by another account.';
       return {
        message: errorMessage,
        errors: { email: [errorMessage] },
        success: false,
      };
    }
    return {
      message: errorMessage,
      errors: { general: [errorMessage] },
      success: false,
    };
  }
}


// Login schema and state
const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
  error: z.string().optional(),
});

export type LoginFormState = {
  message: string;
  errors?: {
    email?: string[];
    password?: string[];
    general?: string[];
  };
  success: boolean;
};


export async function loginUser(
  prevState: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {

  // If we get an error passed from the client-side, we immediately set that as the state.
  const errorMessage = formData.get('error') as string | null;
  if(errorMessage){
     return {
      message: errorMessage,
      errors: { general: [errorMessage] },
      success: false,
    };
  }


  const validatedFields = loginSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      message: 'Please correct the errors below.',
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  // Client-side sign-in handles the actual authentication.
  // This server action is for any additional server-side logic after a successful client-side login,
  // such as setting up a session or logging the event. For now, it just confirms success.
  
  return { message: 'Login successful!', success: true };
}


async function getAuthenticatedUser(idToken?: string | null) {
  const tokenToVerify = idToken || headers().get('Authorization')?.split('Bearer ')[1];
  if (!tokenToVerify) {
    return null;
  }
  try {
    const decodedToken = await getAuth().verifyIdToken(tokenToVerify);
    return decodedToken;
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
}

export type UserProfile = {
  uid: string;
  name: string;
  email: string;
  college: string;
  department: string;
  division: string;
  yearOfStudy: string;
  createdAt: string;
};

export async function getUserProfile(idToken?: string): Promise<UserProfile | null> {
  const user = await getAuthenticatedUser(idToken);
  if (!user) {
    return null;
  }

  try {
    const db = admin.firestore();
    const userDoc = await db.collection('users').doc(user.uid).get();

    if (!userDoc.exists) {
      return null;
    }

    const userData = userDoc.data();
    return {
      uid: user.uid,
      name: userData?.name,
      email: userData?.email,
      college: userData?.college,
      department: userData?.department,
      division: userData?.division,
      yearOfStudy: userData?.yearOfStudy,
      createdAt: userData?.createdAt.toDate().toLocaleDateString(),
    };
  } catch (error) {
    console.error('Error fetching user profile from Firestore:', error);
    return null;
  }
}


const updateProfileSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  college: z.string().min(2, { message: 'College name must be at least 2 characters' }),
  department: z.string().min(1, { message: 'Please enter a department' }),
  div: z.string().regex(/^[a-zA-Z0-9]+$/, { message: 'Division must be alphanumeric' }),
  year: z.string().min(1, { message: 'Please select your year of study' }),
  idToken: z.string(),
});

export type UpdateProfileFormState = {
  message: string;
  errors?: {
    name?: string[];
    college?: string[];
    department?: string[];
    div?: string[];
    year?: string[];
    general?: string[];
  };
  success: boolean;
};

export async function updateUserProfile(
  prevState: UpdateProfileFormState,
  formData: FormData
): Promise<UpdateProfileFormState> {
  const validatedFields = updateProfileSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  
  if (!validatedFields.success) {
    return {
      message: 'Please correct the errors below.',
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  const { idToken, name, college, department, div, year } = validatedFields.data;

  const user = await getAuthenticatedUser(idToken);
  if (!user) {
    return {
      message: 'You must be logged in to update your profile.',
      errors: { general: ['Authentication failed.'] },
      success: false,
    };
  }
  
  try {
    // Update Firestore document
    const db = admin.firestore();
    await db.collection('users').doc(user.uid).update({
      name,
      college,
      department,
      division: div,
      yearOfStudy: year,
    });

    // Update Firebase Auth display name if it has changed
    if (user.name !== name) {
      await getAuth().updateUser(user.uid, { displayName: name });
    }

    revalidatePath('/profile');

    return { message: 'Profile updated successfully!', success: true };
  } catch (error) {
    console.error('Error updating profile:', error);
    return {
      message: 'An unexpected error occurred.',
      errors: { general: ['Failed to update profile.'] },
      success: false,
    };
  }
}