"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardBody } from "@heroui/card";
import Link from "next/link";
import { Image } from "@heroui/image";
import { Spinner } from "@heroui/spinner";

import { Drama, Episode } from "@/app/generated/prisma";
import MyBreadcrumbs from "@/components/my-breadcrumbs";
import VideoJSPlayer from "@/components/video-js-player";
import NextPrev from "@/components/next-prev";
import EpisodeBox from "@/components/episode-box";
import PopularDrama from "@/components/popular-drama";
import BoxUpdateFetch from "@/components/box-update-fetch";
import AdsenseSlot from "@/components/adsense-slot";

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

interface JsonDrama {
  success: boolean;
  drama: Drama & { episodes: Episode[] };
}

export default function EpisodeClientPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [episode, setEpisode] = useState<EpisodeDetail | null>(null);
  const [drama, setDrama] = useState<JsonDrama["drama"] | null>(null);
  const [popular, setPopular] = useState<Drama[]>([]);

  useEffect(() => {
    async function fetchData() {
      const resEp = await fetch(`/api/episodes/${slug}`);
      const epJson: JsonEpisode = await resEp.json();

      setEpisode(epJson.episode);

      const resDrama = await fetch(`/api/drama/${epJson.episode.drama.slug}`);
      const dramaJson: JsonDrama = await resDrama.json();

      setDrama(dramaJson.drama);

      const resPop = await fetch(`/api/drama/popular`);
      const popJson: Drama[] = await resPop.json();

      setPopular(popJson);
    }

    fetchData();
  }, [slug]);

  if (!episode || !drama)
    return (
      <Spinner className="min-h-screen w-full" label="Loading..." size="lg" />
    );

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
          {episode.drama.title} Episod {episode.episodeNum} Tonton Drama Video
        </h1>
        <Card className="mt-2 mx-auto">
          <CardBody className="px-4 py-4">
            <Image
              alt={episode.drama.title}
              className="md:w-1/2 mx-auto my-4"
              src={episode.drama.thumbnail}
            />
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
                    },
                  )}
                </time>
              </p>
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
        <Card>
          <CardBody>
            <VideoJSPlayer src={episode.videoUrl} />
          </CardBody>
        </Card>

        <NextPrev episodes={drama.episodes} slug={slug} />

        <AdsenseSlot slot="3453782357" />

        <EpisodeBox drama={drama} episodes={drama.episodes} />

        <Card className="my-4">
          <CardBody>
            <p className="text-tiny font-light">
              Nikmati koleksi drama Melayu popular dan drama Malaysia full
              episod hanya di MangEakk Drama...
              <Link
                className="text-tiny mx-1 font-semibold"
                href="/"
                target="_parent"
              >
                MangEakkk
              </Link>
              Drama
            </p>
          </CardBody>
        </Card>

        <AdsenseSlot slot="4939773358" />
        <div className="my-4">
          <PopularDrama drama={popular} isLoading={false} />
        </div>
      </section>
      <BoxUpdateFetch />
    </div>
  );
}
