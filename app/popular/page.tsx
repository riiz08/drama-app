import Heading from "@/components/heading";
import getAllPopularDrama from "../actions/drama/getAllPopularDrama";
import { Link } from "@heroui/link";
import DramaCard from "@/components/drama-card";
import ListBoxUpdate from "@/components/list-box-update";
import { getLatestEpisodes } from "../actions/episode/getLatestEpisodes";
import { getSeoMetadata } from "@/libs/seo";

export const metadata = getSeoMetadata({
  title: "Tonton Drama Melayu Terkini Percuma | MangEakk Drama",
  description:
    "MangEakkk Drama - Nikmati streaming drama Melayu terbaru dan terbaik dari Indonesia, Malaysia, Brunei, dan Singapura. Tersedia untuk semua kalangan, dari remaja hingga dewasa. Tonton kapan saja, di mana saja dengan kualitas terbaik!",
});

const Page = async () => {
  const dramas = await getAllPopularDrama();
  const episodes = await getLatestEpisodes();

  return (
    <section className="flex justify-center md:justify-between items-start gap-2 flex-col md:flex-row">
      <div className="md:w-4/5">
        <Heading title="Popular" />
        <div className="py-2 grid md:grid-cols-4 grid-cols-2 gap-3 md:gap-2 w-full">
          {dramas.map((drama) => (
            <Link key={drama.id} href={`/drama/${drama.slug}`}>
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
