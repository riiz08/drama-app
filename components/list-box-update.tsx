import { Link } from "@heroui/link";
import { Chip } from "@heroui/chip";
import React from "react";
import { Divider } from "@heroui/divider";

import { PlayIcon } from "./icons";

import { Drama } from "@/app/generated/prisma";
import { Skeleton } from "@heroui/skeleton";

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
    <div className="bg-content1 md:w-1/4 w-full px-4 py-2 mb-4 rounded-md">
      <div className="space-y-1">
        <h3 className="text-sm md:text-medium font-medium">Drama Ongoing</h3>
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
              <div className="flex items-center justify-between w-full my-1">
                <div className="flex">
                  <PlayIcon /> <span className="ml-1">{list.drama.title}</span>
                </div>
                <Chip color="primary" radius="sm" size="sm" variant="shadow">
                  Episode {list.episodeNum}
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
