
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
  studentGrade: z.string().min(1, { message: "Student's grade is required." }),
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
    studentGrade?: string[];
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
    studentGrade: formData.get('studentGrade'),
  });

  if (!validatedFields.success) {
    return {
      message: "Validation failed. Please check the form.",
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  const submissionData = validatedFields.data;

  const AIRTABLE_API_TOKEN = "pattG57kiuclIXGZK.588ad2197b7ce2feaa2a756ab958226225e89f412d26023f41256b25689ff97e";
  const AIRTABLE_BASE_ID = "appLGr7iBCSEKriBN";
  const AIRTABLE_TABLE_NAME = "website signups"; // Updated table name
  const airtableUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`;

  try {
    const airtableResponse = await fetch(airtableUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        records: [
          {
            fields: {
              "Parent First Name": submissionData.parentFirstName,
              "Parent Last Name": submissionData.parentLastName,
              "Student First Name": submissionData.studentFirstName,
              "Student Last Name": submissionData.studentLastName,
              "Email": submissionData.email,
              "Coding Experience": submissionData.codingExperience,
              "Preferred Week": submissionData.preferredWeek,
              "Student Grade": submissionData.studentGrade,
              // Assuming your Airtable has columns with these exact names.
              // Adjust if your Airtable column names are different.
            },
          },
        ],
      }),
    });

    if (!airtableResponse.ok) {
      const errorData = await airtableResponse.json();
      console.error("Airtable API Error:", errorData);
      let errorMessage = "Failed to submit registration to Airtable.";
      if (errorData && errorData.error && errorData.error.message) {
        errorMessage += ` Details: ${errorData.error.message}`;
      } else if (airtableResponse.statusText) {
        errorMessage += ` Status: ${airtableResponse.statusText}`;
      }
      return {
        message: errorMessage,
        success: false,
      };
    }

    const airtableResult = await airtableResponse.json();
    console.log("Airtable submission successful:", airtableResult);

  } catch (error) {
    console.error("Error submitting to Airtable:", error);
    return {
      message: "An unexpected error occurred while submitting your registration. Please try again.",
      success: false,
    };
  }

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
