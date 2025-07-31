import { Link } from "@heroui/link";
import { Chip } from "@heroui/chip";
import React from "react";
import { Divider } from "@heroui/divider";
import { Skeleton } from "@heroui/skeleton";

import { PlayIcon } from "./icons";
import Heading from "./heading";

import { Drama } from "@/app/generated/prisma";

interface LatestEpisode {
  episodeNum: number;
  slug: string;
  id: string;
  releaseDate: Date;
  createdAt: Date;
  updatedAt: Date;
  videoUrl: string;
  dramaId: string;
  drama: Drama;
}

interface ListBoxUpdateProps {
  episodes: LatestEpisode[];
}

const ListBoxUpdate: React.FC<ListBoxUpdateProps> = ({ episodes }) => {
  return (
    <div className="bg-content1 w-full px-4 py-2 my-4">
      <div className="space-y-1">
        <Heading h1={false} href="/latest-update" title="Drama terbaru 2025" />
      </div>
      <Divider className="my-2" />
      <div>
        {episodes.length != 0 ? (
          episodes.map((list) => (
            <Link
              key={list.id}
              className="w-full hover:bg-content2 text-xs"
              color="foreground"
              href={`/${list.slug}`}
              target="_parent"
            >
              <div className="w-full my-1 flex justify-between items-center gap-2">
                <div className="flex justify-center items-center gap-2 px-1 rounded-md">
                  <PlayIcon />
                  <h3 className="font-semibold text-xs md:text-sm">
                    {list.drama.title}
                  </h3>
                </div>
                <Chip color="primary" size="sm" variant="shadow">
                  Episod {list.episodeNum}
                </Chip>
              </div>
            </Link>
          ))
        ) : (
          <div className="space-y-2">
            {Array(8)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i}>
                  <div className="flex items-center justify-between w-full my-1">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-gray-300 rounded-full" />
                      <div className="h-4 w-24 bg-gray-300 rounded" />
                    </div>
                    <div className="h-4 w-16 bg-gray-300 rounded-lg" />
                  </div>
                </Skeleton>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListBoxUpdate;
