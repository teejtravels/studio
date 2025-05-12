
"use client";

import { useEffect, useActionState } from 'react'; // Import useActionState from react
import { useFormStatus } from 'react-dom'; // Keep useFormStatus from react-dom
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
import ClientOnly from '@/components/client-only'; // Import ClientOnly

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
  // Use useActionState instead of useFormState
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
    // Use the state from useActionState to determine errors for react-hook-form
    errors: state?.errors ? state.errors : undefined,
  });

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: "Registration Successful!",
          description: state.message,
        });
        form.reset(); // Reset form on success
      } else {
        toast({
          title: "Registration Failed",
          description: state.message || "Please check the form for errors.",
          variant: "destructive",
        });
      }
    }
  }, [state, toast, form]);

  return (
    <section id={id} className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Wrap the Card with ClientOnly to prevent hydration issues */}
        <ClientOnly>
          <Card className="max-w-2xl mx-auto bg-card border-border/70 shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-4xl font-bold text-glow-accent mb-2">Join the Vibe!</CardTitle>
              <CardDescription className="text-lg text-muted-foreground">
                Sign up your child for an unforgettable coding adventure. Spots are limited!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={formAction} className="space-y-6">
                <div>
                  <Label htmlFor="parentName" className="text-foreground text-sm font-medium">Parent's Name</Label>
                  <Input
                    id="parentName"
                    name="parentName"
                    required
                    className="mt-1 bg-input border-border focus:ring-primary focus:border-primary"
                    aria-invalid={!!state.errors?.parentName}
                    aria-describedby="parentName-error"
                  />
                  {state.errors?.parentName && <p id="parentName-error" className="text-sm text-destructive mt-1">{state.errors.parentName[0]}</p>}
                </div>

                <div>
                  <Label htmlFor="studentName" className="text-foreground text-sm font-medium">Student's Name</Label>
                  <Input
                    id="studentName"
                    name="studentName"
                    required
                    className="mt-1 bg-input border-border focus:ring-primary focus:border-primary"
                    aria-invalid={!!state.errors?.studentName}
                    aria-describedby="studentName-error"
                  />
                  {state.errors?.studentName && <p id="studentName-error" className="text-sm text-destructive mt-1">{state.errors.studentName[0]}</p>}
                </div>

                <div>
                  <Label htmlFor="email" className="text-foreground text-sm font-medium">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="mt-1 bg-input border-border focus:ring-primary focus:border-primary"
                    aria-invalid={!!state.errors?.email}
                    aria-describedby="email-error"
                  />
                  {state.errors?.email && <p id="email-error" className="text-sm text-destructive mt-1">{state.errors.email[0]}</p>}
                </div>

                <div>
                  <Label htmlFor="codingExperience" className="text-foreground text-sm font-medium">Student's Coding Experience</Label>
                   <Select name="codingExperience" required>
                    <SelectTrigger
                      id="codingExperience"
                      className="mt-1 w-full bg-input border-border focus:ring-primary focus:border-primary"
                      aria-invalid={!!state.errors?.codingExperience}
                      aria-describedby="codingExperience-error"
                    >
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      <SelectItem value="none">None - Complete Beginner</SelectItem>
                      <SelectItem value="beginner">Beginner - Some basic exposure</SelectItem>
                      <SelectItem value="intermediate">Intermediate - Has built small projects</SelectItem>
                    </SelectContent>
                  </Select>
                  {state.errors?.codingExperience && <p id="codingExperience-error" className="text-sm text-destructive mt-1">{state.errors.codingExperience[0]}</p>}
                </div>

                <div>
                  <Label htmlFor="preferredWeek" className="text-foreground text-sm font-medium">Preferred Camp Week</Label>
                  <Select name="preferredWeek" required>
                    <SelectTrigger
                      id="preferredWeek"
                      className="mt-1 w-full bg-input border-border focus:ring-primary focus:border-primary"
                      aria-invalid={!!state.errors?.preferredWeek}
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
                  {state.errors?.preferredWeek && <p id="preferredWeek-error" className="text-sm text-destructive mt-1">{state.errors.preferredWeek[0]}</p>}
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
