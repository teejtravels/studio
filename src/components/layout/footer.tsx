import { Code2, Brain } from 'lucide-react'; // Added Brain icon

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <Brain className="h-6 w-6 text-primary" /> {/* Changed icon to Brain */}
          {/* Updated brand name */}
          <span className="text-lg font-semibold text-foreground">Camp Vibe Code</span>
        </div>
        <p className="text-sm text-muted-foreground">
          {/* Updated brand name */}
          &copy; {new Date().getFullYear()} Camp Vibe Code. All rights reserved. Get ready to build the future with AI!
        </p>
      </div>
    </footer>
  );
}
