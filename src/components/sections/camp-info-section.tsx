import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, TerminalSquare, Github, CodeXml, Lightbulb } from 'lucide-react';

interface CampInfoSectionProps {
  id: string;
}

const infoItems = [
  {
    icon: <Zap className="h-10 w-10 text-primary icon-glow-primary" />,
    title: 'Electrifying Curriculum',
    description: 'Our curriculum is designed to be engaging and fun, teaching core programming concepts through exciting projects inspired by retro-tech and synthwave aesthetics.',
  },
  {
    icon: <CodeXml className="h-10 w-10 text-accent icon-glow-accent" />,
    title: 'Modern Tools, Retro Vibe',
    description: 'Students will get hands-on experience with essential developer tools like VS Code for writing and debugging code in a professional environment.',
  },
  {
    icon: <Github className="h-10 w-10 text-secondary" />, // Using secondary for GitHub for variation
    title: 'Collaborate with GitHub',
    description: 'Learn version control basics with GitHub, understanding how to manage projects, collaborate with others, and showcase their work like a pro.',
  },
  {
    icon: <TerminalSquare className="h-10 w-10 text-primary icon-glow-primary" />,
    title: 'Master the Command Line',
    description: 'Gain confidence using the command line interface (CLI), a fundamental skill for any aspiring developer, to navigate systems and run programs.',
  },
  {
    icon: <Lightbulb className="h-10 w-10 text-accent icon-glow-accent" />,
    title: 'The Vibe-Coding Concept',
    description: 'Vibe-Coding is our unique approach that blends technical skills with creative expression, encouraging students to build projects that are not just functional but also visually and conceptually cool.',
  },
];

export default function CampInfoSection({ id }: CampInfoSectionProps) {
  return (
    <section id={id} className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-glow-primary">
            What Your Child Will Learn
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We provide a cutting-edge learning experience wrapped in an unforgettable retro-futuristic theme.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {infoItems.map((item, index) => (
            <Card key={index} className="bg-card border-border/70 hover:shadow-xl hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader className="items-center text-center">
                <div className="p-4 bg-card rounded-full mb-4 inline-block">
                 {item.icon}
                </div>
                <CardTitle className="text-2xl font-semibold text-foreground">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
