import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/create/drama", "/create/episode"],
      },
      {
        userAgent: ["Applebot", "Bingbot"],
        allow: "/",
        disallow: ["/create/drama", "/create/episode"],
      },
    ],
    sitemap: "https://mangeakkk.my.id/sitemap.xml",
  };
}
