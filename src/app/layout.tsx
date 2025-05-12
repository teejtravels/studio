import type { Metadata } from 'next';
// Using Geist Sans and Mono fonts
import { Inter as FontSans } from 'next/font/google';
// Removed localFont import as the file is missing
// import localFont from 'next/font/local';
import './globals.css';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils'; // Import cn utility

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

// Removed fontHeading as the file is missing
// const fontHeading = localFont({
//   src: '../assets/fonts/CalSans-SemiBold.woff2',
//   variable: '--font-heading',
// });


export const metadata: Metadata = {
  // Updated title
  title: 'Camp Vibe Code',
  // Updated description
  description: 'Learn to build with AI at Camp Vibe Code!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased flex flex-col', // Added flex flex-col
           fontSans.variable,
           // Removed fontHeading variable
           // fontHeading.variable
         )}
       >
        <Header />
        {/* Ensure main takes up available space */}
        <main className="flex-grow">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
