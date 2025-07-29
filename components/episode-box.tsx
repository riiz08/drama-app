"use client";

import React from "react";
import { Drama, Episode } from "@/app/generated/prisma";
import { Divider } from "@heroui/divider";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Heading from "./heading";
import { Link } from "@heroui/link";

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
              href={`/${ep.slug}`}
              className="flex items-center gap-2 p-2 rounded-md hover:bg-content2 transition"
            >
              <Image
                src={drama.thumbnail}
                alt={`Tonton drama ${drama.title} full episod`}
                height={50}
                width={50}
                className="rounded-md"
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
