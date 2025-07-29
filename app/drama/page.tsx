import Heading from "@/components/heading";
import { getAllDramas } from "../actions/drama/getAllDramas";
import { Link } from "@heroui/link";
import DramaCard from "@/components/drama-card";
import PopularDrama from "@/components/popular-drama";
import { getSeoMetadata } from "@/libs/seo";
import AdsenseSlot from "@/components/adsense-slot";
import { getAllPopularDrama } from "../actions/drama/getAllPopularDrama";
import ListBoxUpdate from "@/components/list-box-update";
import BoxAllDrama from "@/components/box-all-drama";
import { unstable_cache } from "next/cache";
import { getLatestEpisodes } from "../actions/episode/getLatestEpisodes";

export async function generateMetadata() {
  return getSeoMetadata({
    title:
      "Koleksi Drama Melayu Terbaru 2025 | Tonton Full Episod HD di Mangeakkk",
    description:
      "Nikmati koleksi drama Melayu & Malaysia terbaru tahun 2025. Tonton semua episod penuh secara percuma dan tanpa iklan dalam kualiti HD hanya di Mangeakkk.",
    url: "https://mangeakkk.my.id/drama",
    keywords:
      "daftar drama melayu, koleksi drama malaysia, full episod, episod lengkap, tonton drama HD, mangeakkk",
  });
}

export const revalidate = 60;

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
  const popDramas: any = await cachedGetAllPopularDrama();
  const dramas = await cachedGetAllDramas();
  const episodeData = await cachedGetLatestEpisodes(1, 8);

  return (
    <div className="grid md:grid-cols-3 gap-2">
      <section className="flex justify-center md:justify-between items-start gap-2 flex-col md:flex-row md:col-span-2">
        <div>
          <AdsenseSlot slot="5978949902" />
          <Heading h1 title="Drama Terkini" />
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
          <PopularDrama drama={popDramas} isLoading={false} />
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
