import { Metadata } from "next";
import { getEpisodeBySlug } from "@/app/actions/episode/getEpisodes";
import { Drama, Episode } from "@/app/generated/prisma";
import { getSeoMetadata } from "@/libs/seo";
import ClientEpisodePage from "@/components/cient-episode-page";

interface EpisodeDetail {
  slug: string;
  id: string;
  title: string;
  videoUrl: string;
  episodeNum: number;
  dramaId: string;
  releaseDate: Date;
  createdAt: Date;
  updatedAt: Date;
  drama: Drama;
}

interface DramaBySlug {
  success: boolean;
  drama: {
    id: string;
    title: string;
    slug: string;
    description: string;
    thumbnail: string;
    status: string;
    releaseDate: Date;
    isPopular: boolean;
    episodes: Episode[];
  };
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const episode = (await getEpisodeBySlug(slug)) as EpisodeDetail;

  if (!episode) {
    return {
      title: "Episod tidak ditemukan | MangEakkk Drama",
    };
  }

  return getSeoMetadata({
    title: `${episode.drama.title} Episod ${episode.episodeNum} | Tonton Drama Melayu Subtitle Gratis`,
    description: `Streaming ${episode.drama.title} Episod ${episode.episodeNum} drama Melayu terbaru 2025. Tonton full episode dengan subtitle Melayu/Indonesia gratis dan kualitas HD di MangEakkk`,
    url: `https://mangeakkk.my.id/${slug}`,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ClientEpisodePage slug={slug} />;
}
