import Heading from "@/components/heading";
import ListBoxUpdate from "@/components/list-box-update";
import { getLatestEpisodes } from "../actions/episode/getLatestEpisodes";
import PopularDrama from "@/components/popular-drama";
import { getSeoMetadata } from "@/libs/seo";
import AdsenseSlot from "@/components/adsense-slot";
import { getAllPopularDrama } from "../actions/drama/getAllPopularDrama";
import BoxAllDrama from "@/components/box-all-drama";
import { getAllDramas } from "../actions/drama/getAllDramas";
import { Link } from "@heroui/link";
import DramaCard from "@/components/drama-card";
import PaginationClient from "@/components/pagination-client";

export const revalidate = 60;

export const metadata = getSeoMetadata({
  title: "Drama Melayu Terbaru Hari Ini",
  description:
    "Senarai drama Melayu paling baru dikemaskini harian. Episod HD, percuma & tanpa iklan hanya di Mangeakkk",
  url: "https://mangeakkk.my.id/latest-update",
  keywords:
    "drama melayu terbaru, episod baru hari ini, update drama 2025, rilisan drama melayu, mangeakkk, streaming HD percuma",
});

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) => {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const limit = 10;

  const episodeData = await getLatestEpisodes(currentPage, limit);
  const populars: any = await getAllPopularDrama();
  const dramas = await getAllDramas();

  return (
    <section>
      <AdsenseSlot slot="5978949902" />
      <Heading h1 title="Rilisan terbaru" />
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
      <PopularDrama drama={populars} isLoading={false} />
      <div>
        <ListBoxUpdate episodes={episodeData.episodes} />
        <BoxAllDrama dramas={dramas} />
      </div>
    </section>
  );
};

export default Page;
