"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
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
import { Drama } from "@/app/generated/prisma";
import { Spinner } from "@heroui/spinner";
import AdsenseDebugger from "./adsense-debugger";

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

export default function HomeClient() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = 10;

  const [episodeData, setEpisodeData] = useState<jsonResp | null>(null);
  const [populars, setPopulars] = useState<Drama[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [epRes, popRes] = await Promise.all([
        fetch(`/api/episodes/latest?page=${page}&limit=${limit}`),
        fetch(`/api/drama/popular`),
      ]);
      const episodes = (await epRes.json()) as jsonResp;
      const pops = (await popRes.json()) as Drama[];
      setEpisodeData(episodes);
      setPopulars(pops);
      setLoading(false);
    }

    fetchData();
  }, [page]);

  if (loading || !episodeData)
    return (
      <Spinner size="lg" className="min-h-screen w-full" label="Loading..." />
    );

  return (
    <div className="grid md:grid-cols-3 gap-2">
      <section className="md:col-span-2">
        <CarouselSlider />
        <ScrollShadow
          hideScrollBar
          className="h-20 md:h-16 my-2 bg-content1 p-2 rounded-md"
        >
          <span className="text-tiny">
            <Link
              className="font-semibold text-tiny mr-1"
              color="foreground"
              href="/"
              target="_parent"
            >
              <h2>MangEakk Drama</h2>
            </Link>
            ialah laman streaming percuma untuk tonton drama Melayu terkini...
          </span>
        </ScrollShadow>

        <Heading href="/latest-update" h1={true} title="Drama Terbaru" />
        <div className="grid md:grid-cols-5 grid-cols-2 gap-3 md:gap-2 w-full">
          {episodeData.episodes.map((episode) => (
            <Link key={episode.slug} href={`/${episode.slug}`} target="_parent">
              <DramaCard
                episodeNum={episode.episodeNum}
                image={episode.drama.thumbnail}
                isPopular={false}
                title={episode.drama.title}
              />
            </Link>
          ))}
        </div>

        <div className="mx-auto my-4">
          <PaginationClient
            total={episodeData.totalPages}
            initialPage={episodeData.currentPage}
          />
        </div>

        <AdsenseSlot slot="3927501637" />
        <PopularDrama drama={populars} isLoading={false} />
      </section>

      <BoxUpdateFetch />
    </div>
  );
}
