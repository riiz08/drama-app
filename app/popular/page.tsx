import { Link } from "@heroui/link";

import { getAllPopularDrama } from "../actions/drama/getAllPopularDrama";
import { getLatestEpisodes } from "../actions/episode/getLatestEpisodes";
import { getAllDramas } from "../actions/drama/getAllDramas";

import Heading from "@/components/heading";
import DramaCard from "@/components/drama-card";
import { getSeoMetadata } from "@/libs/seo";
import AdsenseSlot from "@/components/adsense-slot";
import ListBoxUpdate from "@/components/list-box-update";
import BoxAllDrama from "@/components/box-all-drama";
import { unstable_cache } from "next/cache";

export const metadata = getSeoMetadata({
  title: "Drama Melayu Terpopuler 2025",
  description:
    "Streaming drama Melayu terlaris 2025. HD, percuma, dan tanpa iklan. Koleksi episod penuh eksklusif di Mangeakkk.",
  url: "https://mangeakkk.my.id/popular",
  keywords:
    "drama melayu 2025, drama malaysia populer, tonton drama percuma, episod penuh HD, drama trending tanpa iklan, mangeakkk",
});

const Page = async () => {
  const cachedGetLatestEpisodes = unstable_cache(
    async (page: number, limit: number) => {
      return await getLatestEpisodes(page, limit);
    },
    // Cache key harus berubah jika `page` atau `limit` berubah
    ["latest-episodes"],
    { revalidate: 60 } // cache selama 60 detik
  );

  const cachedGetAllPopularDrama = unstable_cache(
    async () => {
      return await getAllPopularDrama();
    },
    ["popular-dramas"],
    { revalidate: 86400 }
  );

  const cachedGetAllDramas = unstable_cache(
    async () => {
      return await getAllDramas();
    },
    ["all-dramas"],
    { revalidate: 86400 }
  );
  const popDramas = await cachedGetAllPopularDrama();
  const dramas = await cachedGetAllDramas();
  const episodeData = await cachedGetLatestEpisodes(1, 8);

  return (
    <div className="grid md:grid-cols-3 gap-2">
      <section className="md:col-span-2">
        <AdsenseSlot slot="5978949902" />
        <Heading h1 title="Drama Teropular" />
        <div className="py-2 grid md:grid-cols-4 grid-cols-2 gap-3 md:gap-2 w-full">
          {popDramas.map((drama) => (
            <Link key={drama.id} href={`/drama/${drama.slug}`} target="_parent">
              <DramaCard
                image={drama.thumbnail}
                isPopular={true}
                title={drama.title}
              />
            </Link>
          ))}
        </div>
      </section>
      <div>
        <ListBoxUpdate episodes={episodeData.episodes} />
        <BoxAllDrama dramas={dramas} />
      </div>
    </div>
  );
};

export default Page;
