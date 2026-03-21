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

const siteUrl = "https://www.treetoptom.be";
const siteTitle = "Tree Top Tom - Professionele Boomverzorging";
const siteDescription =
  "Professionele boomverzorging in Vlaams-Brabant. Vellen, snoeien, aanplanting, boomadvies en hakselen. Veilig, vakkundig en gecertificeerd.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Tree Top Tom",
  },
  description: siteDescription,
  keywords: [
    "boomverzorging",
    "bomen vellen",
    "snoeien",
    "boomadvies",
    "hakselen",
    "stobbenfrees",
    "aanplanting",
    "boomchirurg",
    "Vlaams-Brabant",
    "Tree Top Tom",
    "boomverzorger",
    "professionele boomverzorging",
  ],
  authors: [{ name: "Tree Top Tom" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: "Tree Top Tom",
    locale: "nl_BE",
    type: "website",
    images: [
      {
        url: "/img/hero.png",
        width: 1200,
        height: 630,
        alt: "Tree Top Tom - Professionele boomverzorger aan het werk",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/img/hero.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Tree Top Tom",
  description: siteDescription,
  url: siteUrl,
  telephone: "+32479927426",
  email: "info@treetoptom.be",
  image: `${siteUrl}/img/hero.png`,
  address: {
    "@type": "PostalAddress",
    addressRegion: "Vlaams-Brabant",
    addressCountry: "BE",
  },
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Vlaams-Brabant",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Boomverzorgingsdiensten",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Vellen van Bomen" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Snoeien" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Aanplanting" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Boomadvies" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Hakselen & Frezen" } },
    ],
  },
  sameAs: ["https://instagram.com/_tree_top_tom_"],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ScrollProgress />
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
