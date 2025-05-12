
"use client";

import Link from 'next/link';
import { Menu, Brain } from 'lucide-react'; // Changed Code2 to Brain
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';

const navItems = [
  { label: 'Home', href: '#hero' },
  { label: 'Program', href: '#camp-info' }, // Changed Curriculum to Program
  { label: 'About Us', href: '#about-us' },
  { label: 'Sign Up', href: '#sign-up' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const NavLinks = ({ onItemClick }: { onItemClick?: () => void }) => (
    <>
      {navItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          onClick={onItemClick}
          className="px-3 py-2 rounded-md text-sm font-medium text-foreground hover:text-primary hover:bg-primary/10 transition-colors"
        >
          {item.label}
        </Link>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Brain className="h-8 w-8 text-primary icon-glow-primary" /> {/* Changed Code2 to Brain */}
          <span className="text-2xl font-bold text-glow-primary">VibeCode Camp</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-1">
          <NavLinks />
        </nav>

        <div className="md:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6 text-foreground" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px] bg-background p-4">
              <div className="flex flex-col space-y-4 mt-6">
                <NavLinks onItemClick={() => setMobileMenuOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
