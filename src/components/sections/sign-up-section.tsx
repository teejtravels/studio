
"use client";

import { useEffect, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

const SignUpSchema = z.object({
  parentName: z.string().min(2, { message: "Parent's name must be at least 2 characters." }),
  studentName: z.string().min(2, { message: "Student's name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  codingExperience: z.enum(['none', 'beginner', 'intermediate']),
  preferredWeek: z.string().min(1, {message: "Please select a week"}),
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

  const initialState: SignUpFormState = { message: "", success: false };
  const [state, formAction] = useActionState(submitSignUpForm, initialState);

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      parentName: "",
      studentName: "",
      email: "",
      codingExperience: undefined,
      preferredWeek: "",
    },
    // If the server action returns errors, populate the form errors
    errors: state?.errors ? state.errors : undefined,
  });

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: "Registration Successful!",
          description: state.message,
        });
        form.reset(); // Reset form fields on success
      } else {
        toast({
          title: "Registration Failed",
          description: state.message || "Please check the form for errors.",
          variant: "destructive",
        });
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
                <div>
                  <Label htmlFor="parentName" className="text-foreground text-sm font-medium">Parent's Name</Label>
                  <Input
                    {...form.register("parentName")} // Register with RHF
                    id="parentName"
                    name="parentName" // Keep name for FormData
                    required
                    className="mt-1 bg-input border-border focus:ring-primary focus:border-primary"
                    aria-invalid={!!form.formState.errors.parentName || !!state.errors?.parentName}
                    aria-describedby="parentName-error"
                  />
                   {/* Display RHF error first, then server error */}
                  <p id="parentName-error" className="text-sm text-destructive mt-1">
                    {form.formState.errors.parentName?.message || (state.errors?.parentName ? state.errors.parentName[0] : '')}
                  </p>
                </div>

                <div>
                  <Label htmlFor="studentName" className="text-foreground text-sm font-medium">Student's Name</Label>
                  <Input
                    {...form.register("studentName")}
                    id="studentName"
                    name="studentName"
                    required
                    className="mt-1 bg-input border-border focus:ring-primary focus:border-primary"
                    aria-invalid={!!form.formState.errors.studentName || !!state.errors?.studentName}
                    aria-describedby="studentName-error"
                  />
                   <p id="studentName-error" className="text-sm text-destructive mt-1">
                    {form.formState.errors.studentName?.message || (state.errors?.studentName ? state.errors.studentName[0] : '')}
                  </p>
                </div>

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
            </CardContent>
          </Card>
        </ClientOnly>
      </div>
    </section>
  );
}
