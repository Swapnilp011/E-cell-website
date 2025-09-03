'use server';

import {
  leadershipTestimonialImprovements,
  type LeadershipTestimonialImprovementsInput,
  type LeadershipTestimonialImprovementsOutput,
} from '@/ai/flows/leadership-testimonial-improvements';
import { z } from 'zod';

const formSchema = z.object({
  testimonial: z.string().min(20, {
    message: 'Testimonial must be at least 20 characters long.',
  }),
});

export type FormState = {
  message: string;
  errors?: {
    testimonial?: string[];
  };
  data?: LeadershipTestimonialImprovementsOutput;
};

export async function getLeadershipSuggestions(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = formSchema.safeParse({
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
