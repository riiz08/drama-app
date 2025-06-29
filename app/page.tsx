import { getSeoMetadata } from "@/libs/seo";
import { Drama } from "./generated/prisma";
import PopularDrama from "@/components/popular-drama";
import BoxUpdateFetch from "@/components/box-update-fetch";
import { Link } from "@heroui/link";
import DramaCard from "@/components/drama-card";
import Heading from "@/components/heading";
import { ScrollShadow } from "@heroui/scroll-shadow";
import CarouselSlider from "@/components/carousel";
import PaginationClient from "@/components/pagination-client";
import AdsenseSlot from "@/components/adsense-slot";
import GoogleAdsense from "@/components/google-adsense";
import HomeClient from "@/components/home-client";
import ClientWrapper from "@/components/client-wrapper";

export const metadata = getSeoMetadata({
  title: "Drama Melayu Terbaru 2025 - Tonton Episod Penuh HD",
  description:
    "Streaming drama Melayu 2025 secara percuma. Koleksi episod penuh HD tanpa iklan, dikemaskini setiap hari hanya di Mangeakkk.",
  url: "https://mangeakkk.my.id",
  keywords:
    "drama melayu 2025, tonton drama malaysia, episod penuh HD, drama terbaru, streaming percuma, mangeakkk",
});

interface EpisodeDetail {
  slug: string;
  videoUrl: string;
  episodeNum: number;
  releaseDate: Date;
  drama: Drama;
}

interface jsonResp {
  episodes: EpisodeDetail[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export const revalidate = 180; // Re-generate halaman setiap 60 detik

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  return (
    <ClientWrapper>
      <HomeClient />
    </ClientWrapper>
  );
}
