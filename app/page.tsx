import { getSeoMetadata } from "@/libs/seo";
import { Drama } from "./generated/prisma";
import PopularDrama from "@/components/popular-drama";
import BoxUpdateFetch from "@/components/box-update-fetch";
import { Link } from "@heroui/link";
import DramaCard from "@/components/drama-card";
import Heading from "@/components/heading";
import { ScrollShadow } from "@heroui/scroll-shadow";
import CarouselSlider from "@/components/carousel";
import AdsenseSlot from "@/components/adsense-slot";

export const revalidate = 300; // Re-generate halaman setiap 5 menit

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

export default async function Home() {
  const currentPage = 1;
  const limit = 10;

  const episodeRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/episodes/latest?page=${currentPage}&limit=${limit}`,
    {
      next: { revalidate: 300 },
    }
  );
  const episodeData: jsonResp = await episodeRes.json();

  const popRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/drama/popular`,
    {
      next: { revalidate: 300 },
    }
  );
  const populars: Drama[] = await popRes.json();

  return (
    <div className="grid md:grid-cols-3 gap-2">
      <section className="md:col-span-2">
        <AdsenseSlot slot="5978949902" />
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

        <AdsenseSlot slot="3453782357" />
        <PopularDrama drama={populars} isLoading={false} />
      </section>

      <BoxUpdateFetch />
    </div>
  );
}
