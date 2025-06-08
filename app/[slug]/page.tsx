import { Card, CardBody } from "@heroui/card";
import { Metadata } from "next";

import getAllPopularDrama from "@/app/actions/drama/getAllPopularDrama";
import { getDramaBySlug } from "@/app/actions/drama/getDramaBySlug";
import { getEpisodeBySlug } from "@/app/actions/episode/getEpisodes";
import { getLatestEpisodes } from "@/app/actions/episode/getLatestEpisodes";
import { Drama, Episode } from "@/app/generated/prisma";
import MyBreadcrumbs from "@/components/my-breadcrumbs";
import NextPrev from "@/components/next-prev";
import PopularDrama from "@/components/popular-drama";
import { getSeoMetadata } from "@/libs/seo";
import { Link } from "@heroui/link";
import VideoPlayer from "@/components/video-player";
import AdsenseSlot from "@/components/adsense-slot";
import BoxUpdateFetch from "@/components/box-update-fetch";

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
  const episode = (await getEpisodeBySlug(slug)) as EpisodeDetail;

  if (!episode) {
    return {
      title: "Episod tidak ditemukan | MangEakkk Drama",
    };
  }

  return getSeoMetadata({
    title: `${episode.drama.title} Episod ${episode.episodeNum} | Tonton Drama Melayu Subtitle Gratis`,
    description: `Streaming ${episode.drama.title} Episod ${episode.episodeNum} drama Melayu terbaru 2025. Tonton full episode dengan subtitle Melayu/Indonesia gratis dan kualitas HD di MangEakkk`,
    url: `https://mangeakkk.my.id/${slug}`,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const episode = (await getEpisodeBySlug(slug)) as EpisodeDetail;
  const dramaWithEpisode = (await getDramaBySlug(
    episode.drama.slug
  )) as DramaBySlug;
  const populars = await getAllPopularDrama();
  const { episodes } = await getLatestEpisodes();

  return (
    <div className="grid md:grid-cols-3 gap-2">
      <section className="col-span-2">
        <MyBreadcrumbs
          dramaSlug={episode.drama.slug}
          dramaTitle={episode.drama.title}
          episodeNum={episode.episodeNum}
          episodeSlug={episode.slug}
        />

        <Card className="mt-4 mx-auto">
          <CardBody className="px-4 py-4">
            <VideoPlayer src={episode.videoUrl} />
            <div className="my-4">
              <h1 className="md:text-2xl text-md mb-2 font-bold">
                Tonton Drama Melayu {episode.drama.title} Episod{" "}
                {episode.episodeNum}
              </h1>
              <h2 className="text-tiny font-light">
                {episode.drama.description}
              </h2>
              <p className="max-w-xl font-semibold text-sm my-1">
                Status:
                <span className="text-tiny font-light ml-1">
                  {episode.drama.status}
                </span>
              </p>
              {episode.drama.releaseDate ? (
                <p className="max-w-xl font-semibold text-sm my-1">
                  Release Date:
                  <time
                    className="text-tiny font-light ml-1"
                    dateTime={episode.drama.releaseDate.toISOString()}
                  >
                    {episode.drama.releaseDate.toLocaleDateString("ms-MY", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                </p>
              ) : (
                ""
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
        <NextPrev episodes={dramaWithEpisode.drama.episodes} slug={slug} />
        <AdsenseSlot slot="3927501637" />
        <Card className="my-4">
          <CardBody>
            <p className="text-tiny font-light">
              Nikmati koleksi drama Melayu popular dan drama Malaysia full
              episod hanya di MangEakk Drama. Di halaman ini, anda boleh tonton
              drama terkini dari pelbagai genre — dari cinta, aksi, hingga
              keluarga — semuanya dalam kualiti HD dan subtitle Melayu atau
              Indonesia. Sesuai untuk penonton dari Malaysia, Brunei, Singapura,
              dan Indonesia yang ingin mengikuti drama terbaru 2025 secara mudah
              dan percuma.Tonton Drama
              <span className="font-semibold mx-1">{episode.drama.title}</span>
              Hanya di
              <Link className="text-tiny mx-1 font-semibold" href="/">
                MangEakkk
              </Link>
              Drama
            </p>
          </CardBody>
        </Card>
        <AdsenseSlot slot="5978949902" />
        <div className="my-4">
          <PopularDrama drama={populars} isLoading={false} />
        </div>
      </section>
      <BoxUpdateFetch />
    </div>
  );
}
