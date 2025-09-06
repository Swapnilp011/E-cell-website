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
import { auth as clientAuth } from '@/lib/firebase/client';
import { signInWithEmailAndPassword } from 'firebase/auth';

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
  degree: z.string().min(1, { message: 'Please enter a degree' }),
  course: z.string().min(1, { message: 'Please select a course' }),
  customCourse: z.string().optional(),
  div: z.string().regex(/^[a-zA-Z0-9]+$/, { message: 'Division must be alphanumeric' }),
  year: z.string().min(1, { message: 'Please select your year of study' }),
}).refine(data => {
    if (data.course === 'Other') {
        return !!data.customCourse && data.customCourse.length > 0;
    }
    return true;
}, {
    message: "Please specify your course",
    path: ["customCourse"],
});

export type RegisterFormState = {
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    college?: string[];
    degree?: string[];
    course?: string[];
    customCourse?: string[];
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
  if (!admin.apps.length) {
    console.error('Firebase Admin SDK is not initialized.');
    return {
      message: 'Server configuration error. Please contact support.',
      errors: { general: ['Server not ready.'] },
      success: false,
    };
  }
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

  const { email, password, name, college, degree, course, customCourse, div, year } =
    validatedFields.data;

  const finalCourse = course === 'Other' ? customCourse : course;

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
      degree,
      course: finalCourse,
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

  const { email, password } = validatedFields.data;
  
  try {
    // Note: We need to use the client SDK to sign in the user on the browser.
    // This server action's primary purpose is to validate and then trigger a client-side login.
    // A real implementation might create a session cookie here, but for this app,
    // we will rely on the Firebase client-side auth state.
    // The actual sign-in will be triggered from the component based on the success of this action.
    if (!clientAuth) {
      throw new Error("Firebase client auth is not initialized.");
    }
    // This call does not actually sign the user in on the server,
    // but it verifies the credentials against Firebase Auth.
    // We must call this on the client to persist session.
    await signInWithEmailAndPassword(clientAuth, email, password);

  } catch (error: any) {
    let errorMessage = 'An unexpected error occurred.';
    if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
      errorMessage = 'Invalid email or password.';
    } else {
        console.error("Login Error: ", error.code, error.message);
    }
    return {
      message: errorMessage,
      errors: { general: [errorMessage] },
      success: false,
    };
  }
  
  return { message: 'Login successful!', success: true };
}


async function getAuthenticatedUser(idToken?: string | null) {
  if (!admin.apps.length) {
    console.error('Firebase Admin SDK is not initialized. Cannot authenticate user.');
    return null;
  }
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
  degree: string;
  course: string;
  division: string;
  yearOfStudy: string;
  createdAt: string;
};

export async function getUserProfile(idToken?: string): Promise<UserProfile | null> {
  if (!admin.apps.length) {
    console.error('Firebase Admin SDK is not initialized. Cannot get user profile.');
    return null;
  }
  
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
      degree: userData?.degree,
      course: userData?.course,
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
  degree: z.string().min(1, { message: 'Please enter a degree' }),
  course: z.string().min(1, { message: 'Please select a course' }),
  customCourse: z.string().optional(),
  div: z.string().regex(/^[a-zA-Z0-9]+$/, { message: 'Division must be alphanumeric' }),
  year: z.string().min(1, { message: 'Please select your year of study' }),
  idToken: z.string(),
}).refine(data => {
    if (data.course === 'Other') {
        return !!data.customCourse && data.customCourse.length > 0;
    }
    return true;
}, {
    message: "Please specify your course",
    path: ["customCourse"],
});

export type UpdateProfileFormState = {
  message: string;
  errors?: {
    name?: string[];
    college?: string[];
    degree?: string[];
    course?: string[];
    customCourse?: string[];
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

  const { idToken, name, college, degree, course, customCourse, div, year } = validatedFields.data;
  
  const finalCourse = course === 'Other' ? customCourse : course;

  const user = await getAuthenticatedUser(idToken);
  if (!user) {
    return {
      message: 'You must be logged in to update your profile.',
      errors: { general: ['Authentication failed.'] },
      success: false,
    };
  }
  
  if (!admin.apps.length) {
    console.error('Firebase Admin SDK is not initialized.');
    return {
      message: 'Server configuration error. Please contact support.',
      errors: { general: ['Server not ready.'] },
      success: false,
    };
  }

  try {
    // Update Firestore document
    const db = admin.firestore();
    await db.collection('users').doc(user.uid).update({
      name,
      college,
      degree,
      course: finalCourse,
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
