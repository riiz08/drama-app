import Heading from "@/components/heading";
import { getLatestEpisodes } from "../actions/episode/getLatestEpisodes";
import { getAllDramas } from "../actions/drama/getAllDramas";
import { Link } from "@heroui/link";
import DramaCard from "@/components/drama-card";
import PopularDrama from "@/components/popular-drama";
import getAllPopularDrama from "../actions/drama/getAllPopularDrama";
import BoxUpdateFetch from "@/components/box-update-fetch";

const Page = async () => {
  const { episodes } = await getLatestEpisodes();
  const dramas = await getAllDramas();
  const populars = await getAllPopularDrama();

  return (
    <div className="grid md:grid-cols-3 gap-2">
      <section className="flex justify-center md:justify-between items-start gap-2 flex-col md:flex-row md:col-span-2">
        <div>
          <Heading title="Drama" />
          <div className="py-2 grid md:grid-cols-4 grid-cols-2 gap-3 md:gap-2 w-full">
            {dramas.map((drama) => (
              <Link
                key={drama.id}
                href={`/drama/${drama.slug}`}
                target="_parent"
              >
                <DramaCard
                  image={drama.thumbnail}
                  isPopular={false}
                  title={drama.title}
                />
              </Link>
            ))}
          </div>
          <PopularDrama drama={populars} isLoading={false} />
        </div>
      </section>
      <BoxUpdateFetch />
    </div>
  );
};

export default Page;
