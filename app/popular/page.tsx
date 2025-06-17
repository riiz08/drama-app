import Heading from "@/components/heading";
import getAllPopularDrama from "../actions/drama/getAllPopularDrama";
import { Link } from "@heroui/link";
import DramaCard from "@/components/drama-card";
import { getLatestEpisodes } from "../actions/episode/getLatestEpisodes";
import { getSeoMetadata } from "@/libs/seo";
import BoxUpdateFetch from "@/components/box-update-fetch";

export const metadata = getSeoMetadata({
  title: "Drama Melayu Paling Populer 2025 | Tonton Episod Penuh di Mangeakkk",
  description:
    "Koleksi drama Melayu dan Malaysia paling populer tahun 2025. Tonton episod penuh secara percuma dalam kualiti HD tanpa iklan di Mangeakkk.",
  url: "https://mangeakkk.my.id/popular",
  keywords:
    "drama melayu populer, drama malaysia terlaris, episod penuh, tonton drama HD, mangeakkk, drama trending 2025",
});

const Page = async () => {
  const dramas = await getAllPopularDrama();
  const { episodes } = await getLatestEpisodes();

  return (
    <div className="grid md:grid-cols-3 gap-2">
      <section className="md:col-span-2">
        <Heading h1 title="Popular" />
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
