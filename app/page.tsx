import { Link } from "@heroui/link";
import { ScrollShadow } from "@heroui/scroll-shadow";

import { getLatestEpisodes } from "./actions/episode/getLatestEpisodes";
import getAllPopularDrama from "./actions/drama/getAllPopularDrama";

import Heading from "@/components/heading";
import DramaCard from "@/components/drama-card";
import CarouselSlider from "@/components/carousel";
import PopularDrama from "@/components/popular-drama";
import ListBoxUpdate from "@/components/list-box-update";
import { getSeoMetadata } from "@/libs/seo";

export const metadata = getSeoMetadata({
  title: "Tonton Drama Melayu Terkini Percuma | MangEakk Drama",
  description:
    "MangEakk Drama ialah laman web streaming drama Melayu terkini yang menawarkan tontonan percuma berkualiti tinggi. Tonton drama Malaysia full episod dengan subtitle Melayu dan Indonesia. Sesuai untuk penonton dari Malaysia, Brunei, Singapura dan Indonesia yang ingin menonton drama terbaru 2025 secara online tanpa gangguan iklan.",
});

export default async function Home() {
  const episodes = await getLatestEpisodes();
  const populars = await getAllPopularDrama();

  return (
    <section className="flex justify-center md:justify-between items-start gap-2 flex-col md:flex-row">
      <div className="md:w-4/5">
        <CarouselSlider />
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
          <Heading href="/latest-update" title="Latest Update" />
          <div className="py-2 grid md:grid-cols-4 grid-cols-2 gap-3 md:gap-2 w-full">
            {episodes.map((episode, i) => (
              <Link key={i} href={`/${episode.drama.slug}/${episode.slug}`}>
                <DramaCard
                  episodeNum={episode.episodeNum}
                  image={episode.drama.thumbnail}
                  isPopular={false}
                  title={episode.drama.title}
                />
              </Link>
            ))}
          </div>
          <PopularDrama drama={populars} />
        </div>
      </div>
      <ListBoxUpdate episodes={episodes} />
    </section>
  );
}
