export function getSeoMetadata({
  title,
  description,
  url = "https://mangeakkk.my.id",
  keywords = "drama Melayu, tonton drama online, drama Malaysia, MangEakkk Drama, streaming drama Melayu",
}: {
  title: string;
  description: string;
  url?: string;
  keywords?: string;
}) {
  return {
    title,
    description,
    keywords,
    metadataBase: new URL(url),
    openGraph: {
      title,
      description,
      url,
      siteName: "MangEakkk Drama",
      type: "website",
    },
    alternates: {
      canonical: url,
    },
    other: {
      monetag: "537203fc5a517341cec2a061ef16c4e6",
    },
  };
}
