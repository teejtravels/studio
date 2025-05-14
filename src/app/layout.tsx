import type { Metadata } from 'next';
// Using Audiowide and Exo 2 fonts
import { Audiowide, Exo_2 as FontSans } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils'; // Import cn utility

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], // Specify available weights
});

const fontAudiowide = Audiowide({
  subsets: ['latin'],
  variable: '--font-audiowide',
  weight: '400', // Audiowide only has 400 weight
});


export const metadata: Metadata = {
  title: 'Camp Vibe Code',
  description: 'Learn to build with AI at Camp Vibe Code!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Audiowide&family=Exo+2:ital,wght@0,100..900;1,100..900&family=Monoton&family=Righteous&display=swap" rel="stylesheet" />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased flex flex-col',
           fontSans.variable,
           fontAudiowide.variable // Add Audiowide variable
         )}
       >
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
