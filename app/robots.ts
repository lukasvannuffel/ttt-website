import type { MetadataRoute } from "next";

import { SITE_HOST, SITE_URL } from "@/constants/config";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: "/api/",
        },
        sitemap: `${SITE_URL}/sitemap.xml`,
        host: SITE_HOST,
    };
}
