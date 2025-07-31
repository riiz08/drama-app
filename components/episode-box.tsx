"use client";

import React from "react";
import { Divider } from "@heroui/divider";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Link } from "@heroui/link";

import Heading from "./heading";

import { Episode } from "@/app/generated/prisma";

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

type Props = {
  episodes: Episode[];
  drama: any;
};

const EpisodeBox = ({ episodes, drama }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const currentSlug = pathname?.split("/").pop();

  const handleSelect = (key: React.Key) => {
    router.push(`/${String(key)}`);
  };

  return (
    <div className="w-full bg-content1 mt-4 px-2">
      <Heading h1={false} title="Daftar episode lainnya" />
      <Divider className="mb-2" />
      <ul className="space-y-2 max-h-44 overflow-y-scroll">
        {episodes.map((ep) => (
          <li key={ep.slug}>
            <Link
              className="flex items-center gap-2 p-2 rounded-md hover:bg-content2 transition"
              href={`/${ep.slug}`}
            >
              <Image
                alt={`Tonton drama ${drama.title} full episod`}
                className="rounded-md"
                height={50}
                src={drama.thumbnail}
                width={50}
              />
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  {drama.title} full episod {ep.episodeNum}
                </h3>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EpisodeBox;
