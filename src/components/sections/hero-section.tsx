
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
// Corrected image import path
import heroImage from '@/components/img/vibehero.jpg';

interface HeroSectionProps {
  id: string;
}

export default function HeroSection({ id }: HeroSectionProps) {
  return (
    <section id={id} className="relative h-[calc(100vh-4rem)] min-h-[600px] flex items-center justify-center text-center text-foreground overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage}
          alt="Camp Vibe Code synthwave hero background"
          placeholder="blur"
          quality={80}
          fill
          style={{ objectFit: 'cover' }}
          className="opacity-100"
          priority // Load image sooner
        />
        {/* Adjusted overlay opacity to show more of the background image */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/50 to-background/80 z-10"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6">
          {/* Changed first span to use primary (cyan) glow */}
          <span className="block text-glow-primary">Unlock Your Child's</span>
          <span className="block text-glow-accent">AI Superpowers</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-10">
          {/* Updated brand name */}
          Dive into the future of creation with Camp Vibe Code – where learning to build with AI is an electrifying adventure!
        </p>
        <Link href="#sign-up">
          <Button
            size="lg"
            className="text-lg font-semibold px-10 py-6 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg button-glow-primary transition-all duration-300 transform hover:scale-105"
            // Updated aria-label
            aria-label="Sign up for Camp Vibe Code"
          >
            Join The Vibe!
          </Button>
        </Link>
      </div>
    </section>
  );
}

