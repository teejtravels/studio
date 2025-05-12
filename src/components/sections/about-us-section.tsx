import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Target, Heart, Brain } from 'lucide-react';
import ClientOnly from '@/components/client-only'; // Import ClientOnly

interface AboutUsSectionProps {
  id: string;
}

const instructors = [
  { name: 'Synthia "Prompt" Wave', role: 'Lead AI Instructor & Vibe Architect', avatarHint: 'woman ai expert' },
  { name: 'Codey "Gen" Rider', role: 'AI Curriculum Developer & Code Mentor', avatarHint: 'man ai developer' }, // Updated role
];

export default function AboutUsSection({ id }: AboutUsSectionProps) {
  return (
    <section id={id} className="py-16 md:py-24 bg-background text-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-glow-accent">
            {/* Updated brand name */}
            About Camp Vibe Code
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're passionate about making AI-powered development accessible, fun, and inspiring for the next generation of creators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-card border-border/70">
            <CardHeader className="items-center text-center">
              <Target className="h-10 w-10 text-primary mb-2 icon-glow-primary" />
              <CardTitle className="text-2xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">To ignite a passion for technology and creativity in young minds through cutting-edge, AI-driven development education.</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border/70">
            <CardHeader className="items-center text-center">
              <Heart className="h-10 w-10 text-accent mb-2 icon-glow-accent" />
              <CardTitle className="text-2xl">Our Values</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">Creativity, Collaboration, Curiosity, and AI-Fluency. We believe learning should be an adventure, empowering students to build, innovate, and express themselves by co-creating with AI.</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border/70">
            <CardHeader className="items-center text-center">
              <Brain className="h-10 w-10 text-secondary mb-2" /> {/* Changed icon to Brain for AI focus */}
              <CardTitle className="text-2xl">Our Approach</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">"Vibe-Coding" - our unique approach where students learn to prompt, guide, and collaborate with AI models to generate code and build amazing applications in a supportive and energetic environment.</p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-8 text-glow-primary">Meet the Instructors</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <ClientOnly>
            {instructors.map((instructor) => (
              <Card key={instructor.name} className="bg-card border-border/70 p-6 flex flex-col items-center text-center">
                <Image
                  src={`https://picsum.photos/200/200?random=${instructor.name.replace(/\s+/g, '')}`} // Use name for consistency
                  alt={`Photo of ${instructor.name}`}
                  data-ai-hint={instructor.avatarHint}
                  width={120}
                  height={120}
                  className="rounded-full mb-4 border-4 border-primary"
                />
                <h4 className="text-xl font-semibold text-foreground mb-1">{instructor.name}</h4>
                <p className="text-primary text-sm">{instructor.role}</p>
              </Card>
            ))}
          </ClientOnly>
        </div>
      </div>
    </section>
  );
}
