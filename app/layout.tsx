import type { Metadata, Viewport } from "next";
import { Playfair_Display, Lora } from "next/font/google";

import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { ScrollProgress } from "@/components/ScrollProgress";

import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});

const lora = Lora({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Tree Top Tom - Professionele Boomverzorging",
  description:
    "Professionele boomverzorging in Vlaams-Brabant. Veilig, betrouwbaar en gecertificeerd.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body
        className={`${playfairDisplay.variable} ${lora.variable} antialiased`}
      >
        <ScrollProgress />
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
