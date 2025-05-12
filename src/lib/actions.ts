
"use server";

import { z } from 'zod';

const SignUpSchema = z.object({
  parentName: z.string().min(2, { message: "Parent's name must be at least 2 characters." }),
  studentName: z.string().min(2, { message: "Student's name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  codingExperience: z.enum(['none', 'beginner', 'intermediate'], { message: "Please select coding experience." }),
  preferredWeek: z.string().min(1, { message: "Please select a preferred week." }),
});

export type SignUpFormState = {
  message: string;
  errors?: {
    parentName?: string[];
    studentName?: string[];
    email?: string[];
    codingExperience?: string[];
    preferredWeek?: string[];
  };
  success: boolean;
};

export async function submitSignUpForm(
  prevState: SignUpFormState,
  formData: FormData
): Promise<SignUpFormState> {
  const validatedFields = SignUpSchema.safeParse({
    parentName: formData.get('parentName'),
    studentName: formData.get('studentName'),
    email: formData.get('email'),
    codingExperience: formData.get('codingExperience'),
    preferredWeek: formData.get('preferredWeek'),
  });

  if (!validatedFields.success) {
    return {
      message: "Validation failed. Please check the form.",
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  const { parentName, studentName, email, codingExperience, preferredWeek } = validatedFields.data;

  // In a real application, you would post this data to Airtable, Google Sheet, or a database.
  // For example:
  // try {
  //   const response = await fetch('YOUR_AIRTABLE_ENDPOINT', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer YOUR_API_KEY` },
  //     body: JSON.stringify({ fields: validatedFields.data }),
  //   });
  //   if (!response.ok) throw new Error('Failed to submit to Airtable');
  // } catch (error) {
  //   console.error("Form submission error:", error);
  //   return { message: "An error occurred while submitting the form. Please try again.", success: false };
  // }

  console.log("Form data submitted:", { parentName, studentName, email, codingExperience, preferredWeek });

  return {
    message: `Thanks for signing up, ${parentName}! We've received the registration for ${studentName}. We'll be in touch at ${email} regarding week ${preferredWeek}.`,
    success: true,
  };
}
