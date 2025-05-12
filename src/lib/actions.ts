
"use server";

import { z } from 'zod';

// Updated schema with separate first/last names
const SignUpSchema = z.object({
  parentFirstName: z.string().min(1, { message: "Parent's first name is required." }),
  parentLastName: z.string().min(1, { message: "Parent's last name is required." }),
  studentFirstName: z.string().min(1, { message: "Student's first name is required." }),
  studentLastName: z.string().min(1, { message: "Student's last name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  codingExperience: z.enum(['none', 'beginner', 'intermediate'], { message: "Please select coding experience." }),
  preferredWeek: z.string().min(1, { message: "Please select a preferred week." }),
});

// Updated state type for errors
export type SignUpFormState = {
  message: string;
  errors?: {
    parentFirstName?: string[];
    parentLastName?: string[];
    studentFirstName?: string[];
    studentLastName?: string[];
    email?: string[];
    codingExperience?: string[];
    preferredWeek?: string[];
  };
  success: boolean;
  // Add a field to optionally return data for post-success actions like payment links
  submissionData?: z.infer<typeof SignUpSchema>;
};

export async function submitSignUpForm(
  prevState: SignUpFormState,
  formData: FormData
): Promise<SignUpFormState> {
  const validatedFields = SignUpSchema.safeParse({
    parentFirstName: formData.get('parentFirstName'),
    parentLastName: formData.get('parentLastName'),
    studentFirstName: formData.get('studentFirstName'),
    studentLastName: formData.get('studentLastName'),
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

  const submissionData = validatedFields.data;

  // **Google Sheet / Database Integration Simulation:**
  // In a real application, you would send this data to your backend,
  // which would then save it to a Google Sheet, database (e.g., Firestore), etc.
  // Example:
  // try {
  //   await saveToGoogleSheet(submissionData);
  //   // Or: await db.collection('signups').add(submissionData);
  // } catch (error) {
  //   console.error("Data submission error:", error);
  //   return { message: "An error occurred saving your registration. Please try again.", success: false };
  // }

  console.log("Form data submitted (simulated save):", submissionData);

  // **Stripe Payment Link Generation (Simulation):**
  // Here, you might interact with Stripe's API to create a checkout session
  // or payment link based on the selected week/program.
  // For this example, we'll just pass the data back to the client.

  return {
    message: `Thanks for signing up, ${submissionData.parentFirstName}! We've received the registration for ${submissionData.studentFirstName}. We'll be in touch at ${submissionData.email} regarding week ${submissionData.preferredWeek}.`,
    success: true,
    submissionData: submissionData, // Pass data back for potential client-side actions
  };
}

