import Heading from "@/components/heading";
import ListBoxUpdate from "@/components/list-box-update";
import { getLatestEpisodes } from "../actions/episode/getLatestEpisodes";
import PopularDrama from "@/components/popular-drama";
import getAllPopularDrama from "../actions/drama/getAllPopularDrama";
import { getSeoMetadata } from "@/libs/seo";
import LatestUpdate from "@/components/latest-update";

export const metadata = getSeoMetadata({
  title:
    "Update Drama Melayu Terbaru Hari Ini | Episode Baru 2025 di Mangeakkk",
  description:
    "Lihat senarai drama Melayu dan Malaysia yang baru dikemaskini setiap hari. Episod baru ditambah secara pantas, tonton dalam kualiti HD tanpa iklan hanya di Mangeakkk.",
  url: "https://mangeakkk.my.id/latest-update",
  keywords:
    "drama melayu update, episod baru hari ini, drama terbaru 2025, rilisan terbaru, mangeakkk, tonton drama HD",
});

const Page = async () => {
  const { episodes } = await getLatestEpisodes();
  const populars = await getAllPopularDrama();

  return (
    <section>
      <Heading h1 title="Rilisan terbaru" />
      <LatestUpdate />
      <PopularDrama drama={populars} isLoading={false} />
      <ListBoxUpdate episodes={episodes} />
    </section>
  );
};

export default Page;
