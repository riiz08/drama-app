export function getSeoMetadata({
  title,
  description,
  url,
  keywords = "drama Melayu, tonton drama online, drama Malaysia, MangEakkk Drama, streaming drama Melayu",
}: {
  title: string;
  description: string;
  url?: string;
  keywords?: string;
}) {
  const resolvedUrl =
    url ||
    (typeof window !== "undefined"
      ? window.location.href
      : "https://mangeakkk.my.id");

  return {
    title,
    description,
    keywords,
    metadataBase: new URL(resolvedUrl),
    openGraph: {
      title,
      description,
      url,
      siteName: "MangEakkk Drama",
      type: "website",
    },
    alternates: {
      canonical: resolvedUrl,
    },
  };
}
