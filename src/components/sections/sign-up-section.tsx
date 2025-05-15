
"use client";

import { useEffect, useActionState, useState } from 'react'; // Added useState
import { useFormStatus } from 'react-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from 'next/link'; // Import Link for the payment button

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { submitSignUpForm, type SignUpFormState } from '@/lib/actions';
import { useToast } from "@/hooks/use-toast";
import ClientOnly from '@/components/client-only';

// Updated schema type definition to match actions.ts
const SignUpSchema = z.object({
  parentFirstName: z.string().min(1, { message: "Parent's first name is required." }),
  parentLastName: z.string().min(1, { message: "Parent's last name is required." }),
  studentFirstName: z.string().min(1, { message: "Student's first name is required." }),
  studentLastName: z.string().min(1, { message: "Student's last name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  codingExperience: z.enum(['none', 'beginner', 'intermediate']),
  preferredWeek: z.string().min(1, {message: "Please select a week"}),
  studentGrade: z.string().min(1, { message: "Student's grade is required." }),
});


type SignUpFormValues = z.infer<typeof SignUpSchema>;

interface SignUpSectionProps {
  id: string;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-6 button-glow-accent transition-all duration-300 transform hover:scale-105"
      disabled={pending}
      aria-label="Submit sign up form"
    >
      {pending ? "Submitting..." : "Register Now!"}
    </Button>
  );
}

export default function SignUpSection({ id }: SignUpSectionProps) {
  const { toast } = useToast();
  const [showPaymentLink, setShowPaymentLink] = useState(false); // State for payment link visibility

  const initialState: SignUpFormState = { message: "", success: false };
  const [state, formAction] = useActionState(submitSignUpForm, initialState);

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(SignUpSchema),
    // Update default values
    defaultValues: {
      parentFirstName: "",
      parentLastName: "",
      studentFirstName: "",
      studentLastName: "",
      email: "",
      codingExperience: undefined,
      preferredWeek: "",
      studentGrade: "",
    },
    // Errors are set manually in useEffect based on server action state
  });

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: "Registration Successful!",
          description: state.message,
        });
        form.reset(); // Reset form fields on success
        setShowPaymentLink(true); // Show payment link/button on success
      } else {
        toast({
          title: "Registration Failed",
          description: state.message || "Please check the form for errors.",
          variant: "destructive",
        });
        setShowPaymentLink(false); // Ensure payment link is hidden on failure
        // Update form errors based on server response
        if (state.errors) {
          Object.entries(state.errors).forEach(([key, value]) => {
            if (value) {
              form.setError(key as keyof SignUpFormValues, {
                type: 'manual',
                message: value[0], // Assuming the first error message is sufficient
              });
            }
          });
        }
      }
    }
  }, [state, toast, form]);

  // Function to handle form submission via client-side validation first
  const processForm: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setShowPaymentLink(false); // Hide payment link on new submission attempt
    const formData = new FormData(event.currentTarget);

    // Trigger RHF validation
    form.handleSubmit(() => {
      // If RHF validation passes, call the server action
      formAction(formData);
    })(event); // Pass the event to handleSubmit
  };


  return (
    <section id={id} className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ClientOnly>
          <Card className="max-w-2xl mx-auto bg-card border-border/70 shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-4xl font-bold text-glow-accent mb-2">Join the Vibe!</CardTitle>
              <CardDescription className="text-lg text-muted-foreground">
                Sign up your child for an unforgettable AI-powered building adventure at our Redondo Beach camp. Spots are limited!
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Use processForm which includes client-side validation before server action */}
              <form onSubmit={processForm} className="space-y-6">
                {/* Parent Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div>
                     <Label htmlFor="parentFirstName" className="text-foreground text-sm font-medium">Parent's First Name</Label>
                     <Input
                       {...form.register("parentFirstName")}
                       id="parentFirstName"
                       name="parentFirstName"
                       required
                       className="mt-1 bg-input border-border focus:ring-primary focus:border-primary"
                       aria-invalid={!!form.formState.errors.parentFirstName || !!state.errors?.parentFirstName}
                       aria-describedby="parentFirstName-error"
                     />
                     <p id="parentFirstName-error" className="text-sm text-destructive mt-1">
                       {form.formState.errors.parentFirstName?.message || (state.errors?.parentFirstName ? state.errors.parentFirstName[0] : '')}
                     </p>
                   </div>
                   <div>
                     <Label htmlFor="parentLastName" className="text-foreground text-sm font-medium">Parent's Last Name</Label>
                     <Input
                       {...form.register("parentLastName")}
                       id="parentLastName"
                       name="parentLastName"
                       required
                       className="mt-1 bg-input border-border focus:ring-primary focus:border-primary"
                       aria-invalid={!!form.formState.errors.parentLastName || !!state.errors?.parentLastName}
                       aria-describedby="parentLastName-error"
                     />
                     <p id="parentLastName-error" className="text-sm text-destructive mt-1">
                       {form.formState.errors.parentLastName?.message || (state.errors?.parentLastName ? state.errors.parentLastName[0] : '')}
                     </p>
                   </div>
                 </div>

                 {/* Student Name Fields */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div>
                     <Label htmlFor="studentFirstName" className="text-foreground text-sm font-medium">Student's First Name</Label>
                     <Input
                       {...form.register("studentFirstName")}
                       id="studentFirstName"
                       name="studentFirstName"
                       required
                       className="mt-1 bg-input border-border focus:ring-primary focus:border-primary"
                       aria-invalid={!!form.formState.errors.studentFirstName || !!state.errors?.studentFirstName}
                       aria-describedby="studentFirstName-error"
                     />
                     <p id="studentFirstName-error" className="text-sm text-destructive mt-1">
                       {form.formState.errors.studentFirstName?.message || (state.errors?.studentFirstName ? state.errors.studentFirstName[0] : '')}
                     </p>
                   </div>
                   <div>
                     <Label htmlFor="studentLastName" className="text-foreground text-sm font-medium">Student's Last Name</Label>
                     <Input
                       {...form.register("studentLastName")}
                       id="studentLastName"
                       name="studentLastName"
                       required
                       className="mt-1 bg-input border-border focus:ring-primary focus:border-primary"
                       aria-invalid={!!form.formState.errors.studentLastName || !!state.errors?.studentLastName}
                       aria-describedby="studentLastName-error"
                     />
                     <p id="studentLastName-error" className="text-sm text-destructive mt-1">
                       {form.formState.errors.studentLastName?.message || (state.errors?.studentLastName ? state.errors.studentLastName[0] : '')}
                     </p>
                   </div>
                 </div>

                {/* Email Field */}
                <div>
                  <Label htmlFor="email" className="text-foreground text-sm font-medium">Email Address</Label>
                  <Input
                    {...form.register("email")}
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="mt-1 bg-input border-border focus:ring-primary focus:border-primary"
                    aria-invalid={!!form.formState.errors.email || !!state.errors?.email}
                    aria-describedby="email-error"
                  />
                   <p id="email-error" className="text-sm text-destructive mt-1">
                    {form.formState.errors.email?.message || (state.errors?.email ? state.errors.email[0] : '')}
                   </p>
                </div>

                {/* Coding Experience Select */}
                <div>
                  <Label htmlFor="codingExperience" className="text-foreground text-sm font-medium">Student's Tech/AI Experience</Label>
                   <Select
                     name="codingExperience" // Keep name for FormData
                     required
                     onValueChange={(value) => form.setValue('codingExperience', value as 'none' | 'beginner' | 'intermediate', { shouldValidate: true })} // Update RHF state
                     value={form.watch('codingExperience')} // Control component with RHF state
                   >
                    <SelectTrigger
                      id="codingExperience"
                      className="mt-1 w-full bg-input border-border focus:ring-primary focus:border-primary"
                      aria-invalid={!!form.formState.errors.codingExperience || !!state.errors?.codingExperience}
                      aria-describedby="codingExperience-error"
                    >
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      <SelectItem value="none">None - Curious Explorer</SelectItem>
                      <SelectItem value="beginner">Beginner - Some exposure to tech/AI tools</SelectItem>
                      <SelectItem value="intermediate">Intermediate - Has experimented with AI or coding</SelectItem>
                    </SelectContent>
                  </Select>
                   <p id="codingExperience-error" className="text-sm text-destructive mt-1">
                    {form.formState.errors.codingExperience?.message || (state.errors?.codingExperience ? state.errors.codingExperience[0] : '')}
                   </p>
                </div>

                {/* Student Grade Select */}
                <div>
                  <Label htmlFor="studentGrade" className="text-foreground text-sm font-medium">Student's Grade (Upcoming School Year)</Label>
                  <Select
                    name="studentGrade" // Keep name for FormData
                    required
                    onValueChange={(value) => form.setValue('studentGrade', value, { shouldValidate: true })} // Update RHF state
                    value={form.watch('studentGrade')} // Control component with RHF state
                  >
                    <SelectTrigger
                      id="studentGrade"
                      className="mt-1 w-full bg-input border-border focus:ring-primary focus:border-primary"
                      aria-invalid={!!form.formState.errors.studentGrade || !!state.errors?.studentGrade}
                      aria-describedby="studentGrade-error"
                    >
                      <SelectValue placeholder="Select student's grade" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      <SelectItem value="1">1st Grade</SelectItem>
                      <SelectItem value="2">2nd Grade</SelectItem>
                      <SelectItem value="3">3rd Grade</SelectItem>
                      <SelectItem value="4">4th Grade</SelectItem>
                      <SelectItem value="5">5th Grade</SelectItem>
                      <SelectItem value="6">6th Grade</SelectItem>
                      <SelectItem value="7">7th Grade</SelectItem>
                      <SelectItem value="8">8th Grade</SelectItem>
                      <SelectItem value="9">9th Grade</SelectItem>
                      <SelectItem value="10">10th Grade</SelectItem>
                      <SelectItem value="11">11th Grade</SelectItem>
                      <SelectItem value="12">12th Grade</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <p id="studentGrade-error" className="text-sm text-destructive mt-1">
                    {form.formState.errors.studentGrade?.message || (state.errors?.studentGrade ? state.errors.studentGrade[0] : '')}
                  </p>
                </div>

                {/* Preferred Week Select */}
                <div>
                  <Label htmlFor="preferredWeek" className="text-foreground text-sm font-medium">Preferred Camp Week</Label>
                  <Select
                    name="preferredWeek" // Keep name for FormData
                    required
                    onValueChange={(value) => form.setValue('preferredWeek', value, { shouldValidate: true })} // Update RHF state
                    value={form.watch('preferredWeek')} // Control component with RHF state
                  >
                    <SelectTrigger
                      id="preferredWeek"
                      className="mt-1 w-full bg-input border-border focus:ring-primary focus:border-primary"
                       aria-invalid={!!form.formState.errors.preferredWeek || !!state.errors?.preferredWeek}
                      aria-describedby="preferredWeek-error"
                    >
                      <SelectValue placeholder="Select a week" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      <SelectItem value="Week 1 (July 8-12)">Week 1 (July 8-12)</SelectItem>
                      <SelectItem value="Week 2 (July 15-19)">Week 2 (July 15-19)</SelectItem>
                      <SelectItem value="Week 3 (July 22-26)">Week 3 (July 22-26)</SelectItem>
                      <SelectItem value="Week 4 (July 29 - Aug 2)">Week 4 (July 29 - Aug 2)</SelectItem>
                    </SelectContent>
                  </Select>
                   <p id="preferredWeek-error" className="text-sm text-destructive mt-1">
                      {form.formState.errors.preferredWeek?.message || (state.errors?.preferredWeek ? state.errors.preferredWeek[0] : '')}
                   </p>
                </div>

                <SubmitButton />
              </form>

              {/* Conditionally render payment button */}
              {showPaymentLink && (
                 <div className="mt-8 text-center">
                   <p className="text-muted-foreground mb-4">Registration received! Please proceed to payment to secure your spot.</p>
                   {/* Placeholder Stripe Link - Replace with actual generated link */}
                   <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground button-glow-primary">
                     <Link href="https://buy.stripe.com/placeholder" target="_blank" rel="noopener noreferrer">
                       Proceed to Payment
                     </Link>
                   </Button>
                   <p className='text-xs text-muted-foreground mt-2'>(Opens in new tab)</p>
                 </div>
               )}

            </CardContent>
          </Card>
        </ClientOnly>
      </div>
    </section>
  );
}
