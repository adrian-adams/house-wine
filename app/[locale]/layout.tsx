// NextJS
import type { Metadata } from "next";
import { IBM_Plex_Sans, Instrument_Serif } from "next/font/google";
// CSS
import "../globals.css";
// DNS
import dns from 'node:dns';
dns.setServers(['1.1.1.1', '8.8.8.8']);
// Next-Intl
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
// Components
import AuthSessionProvider from '@/components/providers/SessionProvider'
import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/footer/Footer";
import HWContainer from "@/components/layout/HWContainer";

const instrumentSarif = Instrument_Serif({
  variable: "--font-instrument-sarif",
  weight: "400",
  subsets: ["latin"],
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "House Wine",
  description: "Shop from independent sellers, track your cellar with AI, and sell or share through your own online shop.",
};

export default async function LocaleLayout({ children, params }: { children: React.ReactNode, params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${instrumentSarif.variable} ${ibmPlexSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <Navigation />
          <AuthSessionProvider>
            <HWContainer>
              {children}
            </HWContainer>
          </AuthSessionProvider>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
