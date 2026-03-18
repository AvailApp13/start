import './globals.css';
import type { Metadata } from 'next';
import { LanguageProvider } from '@/components/LanguageProvider';
import { Footer, Header } from '@/components/ClientShell';

export const metadata: Metadata = {
  title: 'FIVE ELITE ENTERTAINMENT BALI',
  description: 'Luxury event organizer and artist management website for Bali.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <Header />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
