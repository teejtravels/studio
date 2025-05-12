import { Code2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <Code2 className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold text-foreground">VibeCode Camp</span>
        </div>
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} VibeCode Camp. All rights reserved. Get ready to code the future!
        </p>
      </div>
    </footer>
  );
}
