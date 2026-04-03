import type { Metadata, Viewport } from "next";
import { Lora, Playfair_Display } from "next/font/google";

import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { ScrollProgress } from "@/components/ScrollProgress";
import {
    EMAIL_ADDRESS,
    INSTAGRAM_URL,
    PHONE_NUMBER,
    SITE_URL,
} from "@/constants/config";

import "./globals.css";

const playfairDisplay = Playfair_Display({
    variable: "--font-playfair",
    subsets: ["latin"],
    weight: ["400", "600", "700", "900"],
    display: "swap",
});

const lora = Lora({
    variable: "--font-body",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    display: "swap",
});

const SITE_TITLE = "Tree Top Tom - Professionele Boomverzorging";
const SITE_DESCRIPTION =
    "Professionele boomverzorging in Vlaams-Brabant. Vellen, snoeien, aanplanting, boomadvies en hakselen. Veilig, vakkundig en gecertificeerd.";

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: SITE_TITLE,
        template: "%s | Tree Top Tom",
    },
    description: SITE_DESCRIPTION,
    icons: {
        icon: "/Logo.svg",
        shortcut: "/Logo.svg",
        apple: "/Logo.svg",
    },
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
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        url: SITE_URL,
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
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
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

const JSON_LD = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Tree Top Tom",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    telephone: PHONE_NUMBER,
    email: EMAIL_ADDRESS,
    image: `${SITE_URL}/img/hero.png`,
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
    sameAs: [INSTAGRAM_URL],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="nl">
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
                />
            </head>
            <body className={`${playfairDisplay.variable} ${lora.variable} antialiased`}>
                <ScrollProgress />
                <Navigation />
                {children}
                <Footer />
            </body>
        </html>
    );
}
