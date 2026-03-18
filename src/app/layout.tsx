import type { Metadata } from 'next';
import { Syne, IBM_Plex_Mono, DM_Sans } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import SmoothScrollProvider from '@/src/components/layout/SmoothScrollProvider';
import './globals.css';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800'],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['300', '400', '500', '600', '700'],
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-ui',
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'Software Engineer Portfolio | Backend & Systems Designer',
  description: 'Professional portfolio of a Backend Engineer specializing in Java, Spring Boot, and System Design. Exploring AI applied to software development.',
  openGraph: {
    title: 'Software Engineer Portfolio',
    description: 'Backend Engineer & Systems Designer Portfolio',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${syne.variable} ${ibmPlexMono.variable} ${dmSans.variable} font-mono`} style={{ margin: 0 }}>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
