"use client";

import { useEffect, useState } from "react";
import { Card, CardBody } from "@heroui/card";
import { Link } from "@heroui/link";
import MyBreadcrumbs from "@/components/my-breadcrumbs";
import NextPrev from "@/components/next-prev";
import PopularDrama from "@/components/popular-drama";
import AdsenseSlot from "@/components/adsense-slot";
import BoxUpdateFetch from "@/components/box-update-fetch";
import { Drama, Episode } from "@/app/generated/prisma";
import { Spinner } from "@heroui/spinner";
import VideoJSPlayer from "./video-js-player";

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

export default function ClientEpisodePage({ slug }: { slug: string }) {
  const [episode, setEpisode] = useState<any>(null);
  const [drama, setDrama] = useState<any>(null);
  const [populars, setPopulars] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const resEp = await fetch(`/api/episodes/${slug}`);
      const episodeData = (await resEp.json()) as JsonEpisode;
      setEpisode(episodeData.episode);
      const resDrama = await fetch(
        `/api/drama/${episodeData.episode.drama.slug}`
      );
      const dramaData = (await resDrama.json()) as JsonDrama;
      setDrama(dramaData.drama);
      const resPop = await fetch("/api/drama/popular");
      const popularData = (await resPop.json()) as Drama[];
      setPopulars(popularData);
    }
    fetchData();
  }, [slug]);

  if (!episode || !drama)
    return <Spinner className="min-h-screen w-full" variant="dots" />;

  return (
    <div className="grid md:grid-cols-3 gap-2">
      <section className="md:col-span-2">
        <MyBreadcrumbs
          dramaSlug={episode.drama.slug}
          dramaTitle={episode.drama.title}
          episodeNum={episode.episodeNum}
          episodeSlug={episode.slug}
        />

        <Card className="mt-4 mx-auto">
          <CardBody className="px-4 py-4">
            <VideoJSPlayer src={episode.videoUrl} />
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

        <NextPrev episodes={drama.episodes} slug={slug} />
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

        <AdsenseSlot slot="5978949902" />
        <div className="my-4">
          <PopularDrama drama={populars} isLoading={false} />
        </div>
      </section>
      <BoxUpdateFetch />
    </div>
  );
}
