import { Card, CardBody } from "@heroui/card";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Metadata } from "next";
import PopularDrama from "@/components/popular-drama";
import MyBreadcrumbs from "@/components/my-breadcrumbs";
import { getSeoMetadata } from "@/libs/seo";
import { Drama, Episode } from "@/app/generated/prisma";
import BoxUpdateFetch from "@/components/box-update-fetch";
import AdsenseSlot from "@/components/adsense-slot";
import GoogleAdsense from "@/components/google-adsense";

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
    totalEpisode: number;
    airTime: string;
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const resDrama = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/drama/${slug}`
  );
  const data = (await resDrama.json()) as DramaBySlug;

  if (!data) {
    return {
      title: "Drama tidak ditemukan | MangEakkk Drama",
    };
  }

  return getSeoMetadata({
    title: `${data.drama.title} Episod Penuh 2025 - Tonton Percuma HD`,
    description: `Jangan ketinggalan! Tonton episod penuh ${data.drama.title} 2025 dalam HD tanpa iklan Mangeakkk Drama.`,
    url: `https://mangeakkk.my.id/drama/${slug}`,
    keywords: `${data.drama.title}, tonton ${data.drama.title}, drama melayu terbaru, episod penuh, streaming drama HD, mangeakkk`,
    image: `${data.drama.thumbnail}`,
    type: `article`,
  });
}

export const revalidate = 180;

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resDrama = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/drama/${slug}`
  );
  const data = (await resDrama.json()) as DramaBySlug;
  const resPop = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/drama/popular`
  );
  const populars = (await resPop.json()) as Drama[];

  return (
    <div className="grid md:grid-cols-3 gap-2">
      <section className="md:col-span-2">
        <AdsenseSlot slot="5978949902" />
        <MyBreadcrumbs
          dramaSlug={data.drama.slug}
          dramaTitle={data.drama.title}
        />
        <Card className="w-full my-4">
          <CardBody className="px-6">
            <Image
              alt={data.drama.title}
              className="md:w-1/2 mx-auto my-4"
              src={data.drama.thumbnail}
            />
            <div className="my-4">
              <h1 className="md:text-2xl text-md mb-2 font-bold">
                Drama Melayu {data.drama.title} - Tonton Full Episode Gratis
              </h1>
              <h2 className="text-tiny font-light">{data.drama.description}</h2>
              <p className="max-w-xl font-semibold text-sm my-1">
                Status:
                <span className="text-tiny font-light ml-1">
                  {data.drama.status}
                </span>
              </p>
              <p className="max-w-xl font-semibold text-sm my-1">
                Release Date:
                <time
                  className="text-tiny font-light ml-1"
                  dateTime={new Date(data.drama.releaseDate).toISOString()}
                >
                  {new Date(data.drama.releaseDate).toLocaleDateString(
                    "ms-MY",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }
                  )}
                </time>
              </p>
              <p className="max-w-xl font-semibold text-sm my-1">
                Total Episode:
                <span className="text-tiny font-light ml-1">
                  {data.drama.totalEpisode}
                </span>
              </p>
              <p className="max-w-xl font-semibold text-sm my-1">
                Waktu Tayang:
                <span className="text-tiny font-light ml-1">
                  {data.drama.airTime}
                </span>
              </p>
            </div>

            <AdsenseSlot slot="3453782357" />

            <p className="text-tiny font-light mb-3">
              Nikmati koleksi drama Melayu popular dan drama Malaysia full
              episod hanya di MangEakk Drama. Di halaman ini, anda boleh tonton
              drama terkini dari pelbagai genre — dari cinta, aksi, hingga
              keluarga — semuanya dalam kualiti HD dan subtitle Melayu atau
              Indonesia. Sesuai untuk penonton dari Malaysia, Brunei, Singapura,
              dan Indonesia yang ingin mengikuti drama terbaru 2025 secara mudah
              dan percuma.
              <span className="font-bold mr-1">
                Tonton Drama {data.drama.title} hanya di
              </span>
              <Link
                className="text-tiny font-bold"
                color="primary"
                href="/"
                target="_parent"
              >
                MangEakkk Drama
              </Link>
            </p>

            <div className="flex flex-wrap justify-start items-center gap-2 py-4 px-4 rounded-md bg-content2">
              {data.drama.episodes.map((episode) => (
                <Button
                  key={episode.id}
                  isIconOnly
                  as={Link}
                  color="success"
                  href={`/${episode.slug}`}
                  variant="flat"
                  target="_parent"
                >
                  {episode.episodeNum}
                </Button>
              ))}
            </div>
          </CardBody>
        </Card>
        <div className="my-4">
          <AdsenseSlot slot="2317483012" />
          <PopularDrama drama={populars} isLoading={false} />
        </div>
      </section>
      <BoxUpdateFetch />
    </div>
  );
}
