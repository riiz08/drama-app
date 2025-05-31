import { Link } from "@heroui/link";
import { ScrollShadow } from "@heroui/scroll-shadow";
import getAllPopularDrama from "./actions/drama/getAllPopularDrama";
import Heading from "@/components/heading";
import DramaCard from "@/components/drama-card";
import CarouselSlider from "@/components/carousel";
import PopularDrama from "@/components/popular-drama";
import ListBoxUpdate from "@/components/list-box-update";
import { getSeoMetadata } from "@/libs/seo";
import { getLatestEpisodes } from "./actions/episode/getLatestEpisodes";
import { Pagination } from "@heroui/pagination";
import CarouselClientWrapper from "@/components/carousel-client-wrapper";

export const metadata = getSeoMetadata({
  title: "Nonton Drama Melayu Terbaru 2025 | Streaming Gratis di MangEakk",
  description:
    "Streaming drama Melayu terbaru dari Malaysia, Brunei, dan Indonesia. Nikmati tayangan kualitas HD dengan subtitle, tanpa iklan!",
});

export default async function Home({
  params,
}: {
  params: Promise<{ page: number | 1 }>;
}) {
  const currentPage = (await params).page;
  const limit = 8;

  const { episodes, totalPages } = await getLatestEpisodes(currentPage, limit);
  const populars = await getAllPopularDrama();

  return (
    <section className="flex justify-center md:justify-between w-fit items-start gap-2 flex-col md:flex-row">
      <div className="md:w-4/5">
        <CarouselClientWrapper />
        <ScrollShadow
          hideScrollBar
          className="h-20 md:h-16 my-2 bg-content1 p-2 rounded-md"
        >
          <p className="text-tiny">
            <Link
              className="font-semibold text-tiny mr-1"
              color="foreground"
              href="/"
            >
              MangEakk Drama
            </Link>
            ialah laman streaming percuma untuk tonton drama Melayu terkini dan
            drama Malaysia full episod. Nikmati tayangan berkualiti dengan
            subtitle Melayu dan Indonesia, sesuai untuk penonton dari Malaysia,
            Brunei, Singapura, dan Indonesia. Laman ini sentiasa dikemas kini
            dengan drama terbaru 2025 setiap minggu.
          </p>
        </ScrollShadow>
        <div>
          <Heading href="/latest-update" title="Rilis terbaru" />
          <div className="py-2 grid md:grid-cols-4 grid-cols-2 gap-3 md:gap-2 w-full">
            {episodes.map((episode, i) => (
              <Link key={i} href={`/${episode.slug}`}>
                <DramaCard
                  episodeNum={episode.episodeNum}
                  image={episode.drama.thumbnail}
                  isPopular={false}
                  title={episode.drama.title}
                />
              </Link>
            ))}
          </div>
          <div className="mx-auto mb-4">
            <Pagination initialPage={currentPage} total={totalPages} />
          </div>
          <PopularDrama drama={populars} />
        </div>
      </div>
      <ListBoxUpdate episodes={episodes} />
    </section>
  );
}
