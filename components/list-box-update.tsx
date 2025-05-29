import { Link } from "@heroui/link";
import { Chip } from "@heroui/chip";
import React from "react";
import { Divider } from "@heroui/divider";

import { PlayIcon } from "./icons";

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
    <div className="bg-content1 md:w-1/4 w-full px-4 py-2 rounded-md">
      <div className="space-y-1">
        <h3 className="text-sm md:text-medium font-medium">Drama Ongoing</h3>
      </div>
      <Divider className="my-2" />
      <div>
        {episodes.map((list) => (
          <Link
            key={list.id}
            className="w-full hover:bg-content2 text-xs"
            color="foreground"
            href={`/${list.drama.slug}/${list.slug}`}
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
        ))}
      </div>
    </div>
  );
};

export default ListBoxUpdate;
