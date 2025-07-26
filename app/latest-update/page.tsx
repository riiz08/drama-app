import Heading from "@/components/heading";
import ListBoxUpdate from "@/components/list-box-update";
import { getLatestEpisodes } from "../actions/episode/getLatestEpisodes";
import PopularDrama from "@/components/popular-drama";
import getAllPopularDrama from "../actions/drama/getAllPopularDrama";
import { getSeoMetadata } from "@/libs/seo";
import LatestUpdate from "@/components/latest-update";
import AdsenseSlot from "@/components/adsense-slot";
import { notFound } from "next/navigation";

export const metadata = getSeoMetadata({
  title: "Drama Melayu Terbaru Hari Ini | Mangeakkk",
  description:
    "Senarai drama Melayu paling baru dikemaskini harian. Episod HD, percuma & tanpa iklan hanya di Mangeakkk",
  url: "https://mangeakkk.my.id/latest-update",
  keywords:
    "drama melayu terbaru, episod baru hari ini, update drama 2025, rilisan drama melayu, mangeakkk, streaming HD percuma",
});

export const revalidate = 900;

const Page = async () => {
  const { episodes } = await getLatestEpisodes(1, 20);

  if (!episodes) {
    console.error("Failed fetch latest update in latesst update page");
    return notFound();
  }

  const populars = await getAllPopularDrama();

  if (!populars) {
    console.error("Failed fetch popular dramas in latest update page");
    return notFound();
  }

  return (
    <section>
      <AdsenseSlot slot="5978949902" />
      <Heading h1 title="Rilisan terbaru" />
      <LatestUpdate />
      <PopularDrama drama={populars} isLoading={false} />
      <ListBoxUpdate episodes={episodes} />
    </section>
  );
};

export default Page;
