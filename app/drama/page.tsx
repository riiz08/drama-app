import Heading from "@/components/heading";
import ListBoxUpdate from "@/components/list-box-update";
import { getLatestEpisodes } from "../actions/episode/getLatestEpisodes";
import { getAllDramas } from "../actions/drama/getAllDramas";
import { Link } from "@heroui/link";
import DramaCard from "@/components/drama-card";
import PopularDrama from "@/components/popular-drama";
import getAllPopularDrama from "../actions/drama/getAllPopularDrama";

const Page = async () => {
  const episodes = await getLatestEpisodes();
  const dramas = await getAllDramas();
  const populars = await getAllPopularDrama();

  return (
    <section className="flex justify-center md:justify-between items-start gap-2 flex-col md:flex-row">
      <div className="md:w-4/5">
        <Heading title="Drama" />
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
        <PopularDrama drama={populars} />
      </div>
      <ListBoxUpdate episodes={episodes} />
    </section>
  );
};

export default Page;
