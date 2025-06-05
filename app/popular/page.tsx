import Heading from "@/components/heading";
import getAllPopularDrama from "../actions/drama/getAllPopularDrama";
import { Link } from "@heroui/link";
import DramaCard from "@/components/drama-card";
import ListBoxUpdate from "@/components/list-box-update";
import { getLatestEpisodes } from "../actions/episode/getLatestEpisodes";
import { getSeoMetadata } from "@/libs/seo";

export const metadata = getSeoMetadata({
  title: "Nonton Drama Melayu Terbaru 2025 | Streaming Gratis di MangEakk",
  description:
    "Streaming drama Melayu terbaru dari Malaysia, Brunei, dan Indonesia. Nikmati tayangan kualitas HD dengan subtitle, tanpa iklan!",
});

const Page = async () => {
  const dramas = await getAllPopularDrama();
  const { episodes } = await getLatestEpisodes();

  return (
    <section className="flex justify-center md:justify-between items-start gap-2 flex-col md:flex-row">
      <div className="md:w-4/5">
        <Heading title="Popular" />
        <div className="py-2 grid md:grid-cols-4 grid-cols-2 gap-3 md:gap-2 w-full">
          {dramas.map((drama) => (
            <Link key={drama.id} href={`/drama/${drama.slug}`} target="_parent">
              <DramaCard
                image={drama.thumbnail}
                isPopular={false}
                title={drama.title}
              />
            </Link>
          ))}
        </div>
      </div>
      <ListBoxUpdate episodes={episodes} />
    </section>
  );
};

export default Page;
