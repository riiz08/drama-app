export interface SeoInput {
  title: string;
  description: string;
  url?: string;
  keywords?: string;
  image?: string;
  type?: "website" | "article" | "video.episode"; // default: website
  siteName?: string; // default: MangEakkk Drama
}

export function getSeoMetadata({
  title,
  description,
  url,
  keywords = "drama Melayu, tonton drama online, drama Malaysia, MangEakkk Drama, streaming drama HD",
  image,
  type = "website",
  siteName = "MangEakkk Drama",
}: SeoInput) {
  const resolvedUrl =
    url ||
    (typeof window !== "undefined"
      ? window.location.href
      : "https://mangeakkk.my.id");

  const resolvedImage = image || `${resolvedUrl}/logo/logo.png`;

  return {
    title,
    description,
    keywords,
    metadataBase: new URL(resolvedUrl),
    alternates: {
      canonical: resolvedUrl,
    },
    openGraph: {
      title,
      description,
      url: resolvedUrl,
      siteName,
      type,
      images: [
        {
          url: resolvedImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [resolvedImage],
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/favicon/apple-touch-icon.png",
    },
  };
}
