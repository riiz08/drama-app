import { Metadata } from "next";
import { getEpisodeBySlug } from "@/app/actions/episode/getEpisodes";
import { Drama, Episode } from "@/app/generated/prisma";
import { getSeoMetadata } from "@/libs/seo";
import MyBreadcrumbs from "@/components/my-breadcrumbs";
import { Card, CardBody } from "@heroui/card";
import VideoJSPlayer from "@/components/video-js-player";
import NextPrev from "@/components/next-prev";
import EpisodeBox from "@/components/episode-box";
import Link from "next/link";
import PopularDrama from "@/components/popular-drama";
import AdsenseSlot from "@/components/adsense-slot";
import { Image } from "@heroui/image";
import { getDramaBySlug } from "../actions/drama/getDramaBySlug";
import { getAllPopularDrama } from "../actions/drama/getAllPopularDrama";
import ListBoxUpdate from "@/components/list-box-update";
import BoxAllDrama from "@/components/box-all-drama";
import { getAllDramas } from "../actions/drama/getAllDramas";
import { getLatestEpisodes } from "../actions/episode/getLatestEpisodes";

interface EpisodeDetail {
  slug: string;
  id: string;
  title: string;
  videoUrl: string;
  episodeNum: number;
  dramaId: string;
  releaseDate: Date;
  createdAt: Date;
  updatedAt: Date;
  drama: Drama;
}

interface DramaBySlug {
  success: boolean;
  drama: {
    id: string;
    title: string;
    slug: string;
    description: string;
    thumbnail: string;
    status: string;
    releaseDate: Date;
    isPopular: boolean;
    episodes: Episode[];
  };
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const episode: any = await getEpisodeBySlug(slug);

  return getSeoMetadata({
    title: `${episode.drama.title} Full Episod ${episode.episodeNum} HD | Mangeakkk`,
    description: `Saksikan episod ${episode.episodeNum} drama ${episode.drama.title} dalam HD. Tonton percuma di Mangeakkk.`,
    url: `https://mangeakkk.my.id/${slug}`,
    keywords: `tonton ${episode.drama.title} episod ${episode.episodeNum}, episod penuh ${episode.drama.title}, streaming drama melayu HD, drama ${episode.drama.title} 2025, mangeakkk, subtitle melayu, percuma`,
    image: `${episode.drama.thumbnail}`,
    type: "video.episode",
  });
}

interface EpisodeDetail {
  slug: string;
  id: string;
  title: string;
  videoUrl: string;
  episodeNum: number;
  dramaId: string;
  releaseDate: Date;
  createdAt: Date;
  updatedAt: Date;
  drama: Drama;
}

interface JsonEpisode {
  success: boolean;
  episode: EpisodeDetail;
}

interface DramaDetail {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  status: string;
  releaseDate: Date;
  totalEpisode: number;
  airTime: string;
  isPopular: boolean;
  createdAt: Date;
  updatedAt: Date;
  episodes: Episode[];
}

interface JsonDrama {
  success: boolean;
  drama: DramaDetail;
}

export const revalidate = 60;
export async function generateStaticParams() {
  return [];
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const episode: any = await getEpisodeBySlug(slug);
  const drama = (await getDramaBySlug(episode.drama.slug)) as JsonDrama;
  const popular: any = await getAllPopularDrama();
  const dramas = await getAllDramas();
  const episodeData = await getLatestEpisodes();
  return (
    <div className="grid md:grid-cols-3 gap-2">
      <section className="md:col-span-2 mt-2">
        <AdsenseSlot slot="5978949902" />
        <MyBreadcrumbs
          dramaSlug={episode.drama.slug}
          dramaTitle={episode.drama.title}
          episodeNum={episode.episodeNum}
          episodeSlug={episode.slug}
        />
        <h1 className="text-xl mt-2 md:text-3xl font-bold ml-4">
          {episode.drama.title} Full Episod {episode.episodeNum} Tonton Drama
          Video
        </h1>
        <Card className="mt-2 mx-auto">
          <CardBody className="px-4 py-4">
            <div className="flex justify-center">
              <Image
                src={episode.drama.thumbnail}
                alt={episode.drama.title}
                loading="lazy"
                className="mx-auto"
              />
            </div>
            <div className="my-4">
              <h2 className="md:text-2xl text-md mb-2 font-bold">
                {episode.drama.title}
              </h2>
              <h3 className="text-tiny font-light">
                {episode.drama.description}
              </h3>
              <p className="max-w-xl font-semibold text-sm my-1">
                Status:
                <span className="text-tiny font-light ml-1">
                  {episode.drama.status}
                </span>
              </p>
              {episode.drama.releaseDate && (
                <p className="max-w-xl font-semibold text-sm my-1">
                  Release Date:
                  <time
                    className="text-tiny font-light ml-1"
                    dateTime={new Date(episode.drama.releaseDate).toISOString()}
                  >
                    {new Date(episode.drama.releaseDate).toLocaleDateString(
                      "ms-MY",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </time>
                </p>
              )}
              <p className="max-w-xl font-semibold text-sm my-1">
                Total Episode:
                <span className="text-tiny font-light ml-1">
                  {episode.drama.totalEpisode}
                </span>
              </p>
              <p className="max-w-xl font-semibold text-sm my-1">
                Waktu Tayang:
                <span className="text-tiny font-light ml-1">
                  {episode.drama.airTime}
                </span>
              </p>
            </div>
          </CardBody>
        </Card>

        <AdsenseSlot slot="3927501637" />
        <Card className="my-2 mx-auto">
          <CardBody>
            <VideoJSPlayer src={episode.videoUrl} />
          </CardBody>
        </Card>
        <NextPrev episodes={drama.drama.episodes} slug={slug} />
        <AdsenseSlot slot="3453782357" />

        <EpisodeBox episodes={drama.drama.episodes} drama={drama.drama} />

        <Card className="my-4">
          <CardBody>
            <p className="text-tiny font-light">
              Nikmati koleksi drama Melayu popular dan drama Malaysia full
              episod hanya di MangEakk Drama. Di halaman ini, anda boleh tonton
              drama terkini dari pelbagai genre — dari cinta, aksi, hingga
              keluarga — semuanya dalam kualiti HD dan subtitle Melayu atau
              Indonesia. Sesuai untuk penonton dari Malaysia, Brunei, Singapura,
              dan Indonesia yang ingin mengikuti drama terbaru 2025 secara mudah
              dan percuma. Tonton Drama
              <span className="font-semibold mx-1">{episode.drama.title}</span>
              Hanya di
              <Link className="text-tiny mx-1 font-semibold" href="/">
                MangEakkk
              </Link>
              Drama
            </p>
          </CardBody>
        </Card>

        <AdsenseSlot slot="2317483012" />
        <div className="my-4">
          <PopularDrama drama={popular} isLoading={false} />
        </div>
      </section>
      <div>
        <ListBoxUpdate episodes={episodeData.episodes} />
        <BoxAllDrama dramas={dramas} />
      </div>
    </div>
  );
}
