import type { Metadata, Viewport } from "next";
import { Lora, Playfair_Display } from "next/font/google";
import Script from "next/script";

import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { ScrollProgress } from "@/components/ScrollProgress";
import {
    BUSINESS_ALTERNATE_NAME,
    BUSINESS_CITY,
    BUSINESS_COUNTRY,
    BUSINESS_FOUNDER_JOB_TITLE,
    BUSINESS_FOUNDER_NAME,
    BUSINESS_LATITUDE,
    BUSINESS_LEGAL_NAME,
    BUSINESS_LOCALE,
    BUSINESS_LONGITUDE,
    BUSINESS_NAME,
    BUSINESS_POSTAL_CODE,
    BUSINESS_PRICE_RANGE,
    BUSINESS_REGION,
    EMAIL_ADDRESS,
    INSTAGRAM_URL,
    PHONE_NUMBER,
    SITE_URL,
} from "@/constants/config";

import "./globals.css";

const playfairDisplay = Playfair_Display({
    variable: "--font-playfair",
    subsets: ["latin"],
    weight: ["700", "900"],
    display: "swap",
});

const lora = Lora({
    variable: "--font-body",
    subsets: ["latin"],
    weight: ["400", "600"],
    display: "swap",
});

const SITE_TITLE = "Tree Top Tom | Boomverzorger Leuven & Vlaams-Brabant";
const SITE_DESCRIPTION =
    "Tree Top Tom — gecertificeerde boomverzorger in Leuven en Vlaams-Brabant. Vellen, snoeien, aanplanting, boomadvies, hakselen en stronkfrezen. Bel +32 479 92 74 26.";
const GOOGLE_TAG_ID = "G-3PEP2PQWVD";

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: SITE_TITLE,
        template: `%s | ${BUSINESS_NAME}`,
    },
    description: SITE_DESCRIPTION,
    applicationName: BUSINESS_NAME,
    category: "Boomverzorging",
    creator: BUSINESS_NAME,
    publisher: BUSINESS_NAME,
    manifest: "/site.webmanifest",
    icons: {
        icon: [
            {
                type: "image/png",
                sizes: "96x96",
                url: "/favicon-96x96.png",
            },
            {
                type: "image/svg+xml",
                url: "/favicon.svg",
            },
            {
                type: "image/png",
                sizes: "32x32",
                url: "/favicon-32x32.png",
            },
        ],
        shortcut: "/favicon.ico",
        apple: "/apple-touch-icon.png",
    },
    appleWebApp: {
        title: BUSINESS_ALTERNATE_NAME,
    },
    keywords: [
        "Tree Top Tom",
        "TreeTopTom",
        "boomverzorger",
        "boomverzorging",
        "bomen vellen",
        "snoeien",
        "boomadvies",
        "hakselen",
        "stronkfrezen",
        "aanplanting",
        "boomchirurg",
        "Leuven",
        "Vlaams-Brabant",
        "professionele boomverzorging",
    ],
    authors: [{ name: BUSINESS_NAME, url: SITE_URL }],
    alternates: {
        canonical: "/",
        languages: {
            "nl-BE": "/",
        },
    },
    openGraph: {
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        url: SITE_URL,
        siteName: BUSINESS_NAME,
        locale: "nl_BE",
        type: "website",
        images: [
            {
                url: "/img/hero.png",
                width: 1200,
                height: 630,
                alt: `${BUSINESS_NAME} — professionele boomverzorger aan het werk in Vlaams-Brabant`,
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

const BUSINESS_ID = `${SITE_URL}/#business`;
const FOUNDER_ID = `${SITE_URL}/#founder`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const JSON_LD = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": ["LocalBusiness", "ProfessionalService"],
            "@id": BUSINESS_ID,
            name: BUSINESS_NAME,
            alternateName: BUSINESS_ALTERNATE_NAME,
            legalName: BUSINESS_LEGAL_NAME,
            description: SITE_DESCRIPTION,
            url: SITE_URL,
            image: `${SITE_URL}/img/hero.png`,
            logo: `${SITE_URL}/Logo.svg`,
            telephone: PHONE_NUMBER,
            email: EMAIL_ADDRESS,
            priceRange: BUSINESS_PRICE_RANGE,
            address: {
                "@type": "PostalAddress",
                addressLocality: BUSINESS_CITY,
                postalCode: BUSINESS_POSTAL_CODE,
                addressRegion: BUSINESS_REGION,
                addressCountry: BUSINESS_COUNTRY,
            },
            geo: {
                "@type": "GeoCoordinates",
                latitude: BUSINESS_LATITUDE,
                longitude: BUSINESS_LONGITUDE,
            },
            areaServed: {
                "@type": "AdministrativeArea",
                name: BUSINESS_REGION,
            },
            openingHoursSpecification: [
                {
                    "@type": "OpeningHoursSpecification",
                    dayOfWeek: [
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                    ],
                    opens: "08:00",
                    closes: "18:00",
                },
            ],
            founder: { "@id": FOUNDER_ID },
            sameAs: [INSTAGRAM_URL],
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
        },
        {
            "@type": "Person",
            "@id": FOUNDER_ID,
            name: BUSINESS_FOUNDER_NAME,
            jobTitle: BUSINESS_FOUNDER_JOB_TITLE,
            worksFor: { "@id": BUSINESS_ID },
            url: SITE_URL,
            image: `${SITE_URL}/img/hero.png`,
        },
        {
            "@type": "WebSite",
            "@id": WEBSITE_ID,
            name: BUSINESS_NAME,
            alternateName: BUSINESS_ALTERNATE_NAME,
            url: SITE_URL,
            inLanguage: BUSINESS_LOCALE,
            publisher: { "@id": BUSINESS_ID },
        },
    ],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="nl">
            <head>
                <Script
                    src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`}
                    strategy="afterInteractive"
                />
                <Script id="google-tag" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${GOOGLE_TAG_ID}');
                    `}
                </Script>
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
