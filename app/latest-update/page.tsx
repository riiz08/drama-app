import Heading from "@/components/heading";
import ListBoxUpdate from "@/components/list-box-update";
import { getLatestEpisodes } from "../actions/episode/getLatestEpisodes";
import PopularDrama from "@/components/popular-drama";
import getAllPopularDrama from "../actions/drama/getAllPopularDrama";
import { getSeoMetadata } from "@/libs/seo";
import LatestUpdate from "@/components/latest-update";

export const metadata = getSeoMetadata({
  title: "Nonton Drama Melayu Terbaru 2025 | Streaming Gratis di MangEakk",
  description:
    "Streaming drama Melayu terbaru dari Malaysia, Brunei, dan Indonesia. Nikmati tayangan kualitas HD dengan subtitle, tanpa iklan!",
  url: "https://mangeakkk.my.id/latest-update",
});

const Page = async () => {
  const { episodes } = await getLatestEpisodes();
  const populars = await getAllPopularDrama();

  return (
    <section>
      <Heading title="Drama terbaru" />
      <LatestUpdate />
      <PopularDrama drama={populars} isLoading={false} />
      <ListBoxUpdate episodes={episodes} />
    </section>
  );
};

export default Page;
