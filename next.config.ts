import type { NextConfig } from "next";

const securityHeaders = [
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "X-Frame-Options", value: "DENY" },
    { key: "X-DNS-Prefetch-Control", value: "on" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
    turbopack: {
        root: __dirname,
    },
    images: {
        formats: ["image/avif", "image/webp"],
    },
    allowedDevOrigins: [
        "http://localhost:3000",
        "https://*.ngrok-free.app",
    ],
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: securityHeaders,
            },
            {
                source: "/img/:path*",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, immutable",
                    },
                ],
            },
            {
                source: "/:all*(favicon-32x32.png|apple-touch-icon.png|favicon-square-512.png)",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, immutable",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
