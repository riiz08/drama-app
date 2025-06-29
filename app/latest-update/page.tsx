import Heading from "@/components/heading";
import ListBoxUpdate from "@/components/list-box-update";
import { getLatestEpisodes } from "../actions/episode/getLatestEpisodes";
import PopularDrama from "@/components/popular-drama";
import getAllPopularDrama from "../actions/drama/getAllPopularDrama";
import { getSeoMetadata } from "@/libs/seo";
import LatestUpdate from "@/components/latest-update";
import AdsenseSlot from "@/components/adsense-slot";
import GoogleAdsense from "@/components/google-adsense";

export const metadata = getSeoMetadata({
  title: "Drama Melayu Terbaru Hari Ini | Mangeakkk",
  description:
    "Senarai drama Melayu paling baru dikemaskini harian. Episod HD, percuma & tanpa iklan hanya di Mangeakkk",
  url: "https://mangeakkk.my.id/latest-update",
  keywords:
    "drama melayu terbaru, episod baru hari ini, update drama 2025, rilisan drama melayu, mangeakkk, streaming HD percuma",
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
