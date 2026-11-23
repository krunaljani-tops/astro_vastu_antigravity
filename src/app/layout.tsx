import type { Metadata } from 'next';
import { Inter, Cinzel } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
});

export const metadata: Metadata = {
  title: 'AstroVastu AI — Production Astro-Vastu Diagnostic & Advisory Platform',
  description:
    'Vedic astrological intelligence combining Parashari, Navatara 9-Tara Chakra, Bhrigu Nandi Nadi (BNN), and Jaimini Systems with an Admin RAG Reference Knowledge Base.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${cinzel.variable} font-sans min-h-screen flex flex-col bg-cosmic-950 text-slate-100 antialiased`}>
        {children}
        <footer className="border-t border-slate-800/80 bg-cosmic-950/80 py-6 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} AstroVastu AI — Classical Vedic Astrology & Shastra Architecture Intelligence Platform.</p>
          <p className="mt-1 text-slate-600">Built with Lahiri Sidereal Ayanamsha & Verified RAG Shastra Compendiums.</p>
        </footer>
      </body>
    </html>
  );
}
