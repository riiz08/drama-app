import Heading from "@/components/heading";
import getAllPopularDrama from "../actions/drama/getAllPopularDrama";
import { Link } from "@heroui/link";
import DramaCard from "@/components/drama-card";
import { getLatestEpisodes } from "../actions/episode/getLatestEpisodes";
import { getSeoMetadata } from "@/libs/seo";
import BoxUpdateFetch from "@/components/box-update-fetch";

export const metadata = getSeoMetadata({
  title: "Nonton Drama Melayu Terbaru 2025 | Streaming Gratis di MangEakk",
  description:
    "Streaming drama Melayu terbaru dari Malaysia, Brunei, dan Indonesia. Nikmati tayangan kualitas HD dengan subtitle, tanpa iklan!",
});

const Page = async () => {
  const dramas = await getAllPopularDrama();
  const { episodes } = await getLatestEpisodes();

  return (
    <div className="grid md:grid-cols-3 gap-2">
      <section className="col-span-2">
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
      </section>
      <BoxUpdateFetch />
    </div>
  );
};

export default Page;
