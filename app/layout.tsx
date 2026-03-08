import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";

import { Navigation } from "@/components/Navigation";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "Tree Top Tom - Professionele Boomverzorging",
  description:
    "Professionele boomverzorging in Oost-Vlaanderen. Veilig, betrouwbaar en gecertificeerd.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body
        className={`${inter.variable} ${playfairDisplay.variable} antialiased`}
      >
        <Navigation />
        {children}
      </body>
    </html>
  );
}
