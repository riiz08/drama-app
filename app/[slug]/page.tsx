import { Metadata } from "next";
import { getEpisodeBySlug } from "@/app/actions/episode/getEpisodes";
import { Drama, Episode } from "@/app/generated/prisma";
import { getSeoMetadata } from "@/libs/seo";
import MyBreadcrumbs from "@/components/my-breadcrumbs";
import { Card, CardBody } from "@heroui/card";
import VideoJSPlayer from "@/components/video-js-player";
import NextPrev from "@/components/next-prev";
import EpisodeBox from "@/components/episode-box";
import Link from "next/link";
import PopularDrama from "@/components/popular-drama";
import BoxUpdateFetch from "@/components/box-update-fetch";
import AdsenseSlot from "@/components/adsense-slot";
import GoogleAdsense from "@/components/google-adsense";
import { Image } from "@heroui/image";
import EpisodeClientPage from "@/components/episode-client";
import ClientWrapper from "@/components/client-wrapper";

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
    title: `${episode.drama.title} Full Episod ${episode.episodeNum} HD | Mangeakkk`,
    description: `Saksikan episod ${episode.episodeNum} drama ${episode.drama.title} dalam HD. Tonton percuma di Mangeakkk.`,
    url: `https://mangeakkk.my.id/${slug}`,
    keywords: `tonton ${episode.drama.title} episod ${episode.episodeNum}, episod penuh ${episode.drama.title}, streaming drama melayu HD, drama ${episode.drama.title} 2025, mangeakkk, subtitle melayu, percuma`,
    image: `${episode.drama.thumbnail}`,
    type: "video.episode",
  });
}

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

interface JsonEpisode {
  success: boolean;
  episode: EpisodeDetail;
}

interface DramaDetail {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  status: string;
  releaseDate: Date;
  totalEpisode: number;
  airTime: string;
  isPopular: boolean;
  createdAt: Date;
  updatedAt: Date;
  episodes: Episode[];
}

interface JsonDrama {
  success: boolean;
  drama: DramaDetail;
}

export const revalidate = 180;

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <ClientWrapper>{<EpisodeClientPage />}</ClientWrapper>;
}
