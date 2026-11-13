import type { Metadata } from "next";
import { Libre_Baskerville, Inter } from "next/font/google";
import "./globals.css";
import { ConsultaProvider } from "@/context/ConsultaContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConsultaDrawer from "@/components/ConsultaDrawer";
import InfoModal from "@/components/InfoModal";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import A11yAnnouncer from "@/components/A11yAnnouncer";
import { VIVERO_CONFIG } from "@/data/vivero";

const baskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-baskerville",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${VIVERO_CONFIG.name} · Goya, Corrientes`,
  description:
    "Vivero botánico en Goya, Corrientes. Plantas de interior, exterior, cítricos y frutales, huerta y macetas.",
  openGraph: {
    title: `${VIVERO_CONFIG.name} · Goya, Corrientes`,
    description:
      "Vivero botánico en Goya, Corrientes. Plantas de interior, exterior, cítricos y frutales, huerta y macetas.",
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-AR" className={`${baskerville.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-background text-ink selection:bg-sage selection:text-primary">
        <ConsultaProvider>
          <A11yAnnouncer />
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <ConsultaDrawer />
          <InfoModal />
          <WhatsAppFloat />
        </ConsultaProvider>
      </body>
    </html>
  );
}
