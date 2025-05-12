import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, TerminalSquare, Github, CodeXml, Lightbulb, BrainCircuit, MapPin, Globe } from 'lucide-react'; // Added MapPin, Globe

interface CampInfoSectionProps {
  id: string;
}

const infoItems = [
  {
    icon: <Zap className="h-10 w-10 text-primary icon-glow-primary" />,
    title: 'AI-Powered Curriculum',
    description: 'Our curriculum is designed to be engaging and fun, teaching how to leverage AI models for code generation and creative projects.',
  },
  {
    icon: <BrainCircuit className="h-10 w-10 text-accent icon-glow-accent" />,
    title: 'Cutting-Edge AI Tools',
    description: 'Students will get hands-on experience with prompting AI, understanding GenAI models, and using the newest, cutting-edge AI tools and technologies to build AI-integrated applications.',
  },
  {
    icon: <Github className="h-10 w-10 text-secondary" />,
    title: 'Build & Host Your Portfolio',
    description: 'Learn version control with GitHub and deploy your own personal website, designed entirely by you and AI, hosted free on GitHub Pages!',
  },
  {
    icon: <TerminalSquare className="h-10 w-10 text-primary icon-glow-primary" />,
    title: 'Master the Dev Environment',
    description: 'Gain confidence using the command line (terminal), modern IDEs like Firebase Studio, and other essential developer tools for building and deploying AI-assisted projects.',
  },
  {
    icon: <Lightbulb className="h-10 w-10 text-accent icon-glow-accent" />,
    title: 'The Vibe-Coding Concept',
    description: 'Vibe-Coding is our unique approach, empowering students to harness the power of AI models for code generation and application building. They\'ll learn to prompt, iterate, and integrate AI into their creative tech projects.',
  },
   {
    icon: <MapPin className="h-10 w-10 text-secondary" />,
    title: 'Prime Beach Location',
    description: 'Our camp is located in beautiful Redondo Beach, CA, offering an inspiring and sunny environment for learning and creation.',
  },
];

export default function CampInfoSection({ id }: CampInfoSectionProps) {
  return (
    <section id={id} className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-glow-primary">
            What Your Child Will Create & Learn
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We provide a cutting-edge AI learning experience focused on building real-world applications like personal portfolio websites, using the latest tools, all from our Redondo Beach location.
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
