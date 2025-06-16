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
import ClientAdsenseWrapper from "@/components/client-adsense-wrapper";

export const metadata = getSeoMetadata({
  title: "Nonton Drama Melayu Terbaru 2025 | Streaming Gratis di MangEakk",
  description:
    "Streaming drama Melayu terbaru dari Malaysia, Brunei, dan Indonesia. Nikmati tayangan kualitas HD dengan subtitle, tanpa iklan!",
  url: "https://mangeakkk.my.id",
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

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const limit = 10;

  const episodeRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/episodes/latest?page=${currentPage}&limit=${limit}`,
    { cache: "no-store" }
  );
  const episodeData: jsonResp = await episodeRes.json();

  const popRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/drama/popular`,
    { cache: "no-store" }
  );
  const populars: Drama[] = await popRes.json();

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
            >
              <h2>MangEakk Drama</h2>
            </Link>
            ialah laman streaming percuma untuk tonton drama Melayu terkini dan
            drama Malaysia full episod. Nikmati tayangan berkualiti dengan
            subtitle Melayu dan Indonesia, sesuai untuk penonton dari Malaysia,
            Brunei, Singapura, dan Indonesia. Laman ini sentiasa dikemas kini
            dengan drama terbaru 2025 setiap minggu.
          </span>
        </ScrollShadow>

        <Heading href="/latest-update" title="Drama Terbaru" />
        <div className="grid md:grid-cols-5 grid-cols-2 gap-3 md:gap-2 w-full">
          {episodeData.episodes.map((episode) => (
            <Link key={episode.slug} href={`/${episode.slug}`}>
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

        <ClientAdsenseWrapper slot="3927501637" />
        <PopularDrama drama={populars} isLoading={false} />
      </section>

      <BoxUpdateFetch />
    </div>
  );
}
