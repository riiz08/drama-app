"use client";

import { Button } from "@heroui/button";
import { redirect } from "next/navigation";
import React from "react";

import { CheveronDown, ChevronLeft } from "./icons";
import { ChevronRight } from "./heading";

import { Episode } from "@/app/generated/prisma";

interface NextPrevProps {
  episodes: Episode[];
  slug: string;
}

const NextPrev: React.FC<NextPrevProps> = ({ episodes, slug }) => {
  const sortedEpisodes = [...episodes].sort(
    (a, b) => a.episodeNum - b.episodeNum
  );
  const currentIndex = sortedEpisodes.findIndex((ep) => ep.slug === slug);
  const prevEpisode =
    currentIndex > 0 ? sortedEpisodes[currentIndex - 1] : null;
  const nextEpisode =
    currentIndex < sortedEpisodes.length - 1
      ? sortedEpisodes[currentIndex + 1]
      : null;

  const goToEpisode = (slug: string, slugEp: string) => {
    const url = `/${slug}`;

    redirect(url);
  };

  return (
    <div className="flex justify-center my-2 items-center gap-1">
      <Button
        fullWidth
        color="primary"
        isDisabled={!prevEpisode}
        variant="shadow"
        onPress={() => prevEpisode && goToEpisode(slug, prevEpisode.slug)}
      >
        <ChevronLeft />
      </Button>
      <Button isDisabled>
        <CheveronDown />
      </Button>
      <Button
        fullWidth
        color="primary"
        isDisabled={!nextEpisode}
        variant="shadow"
        onPress={() => nextEpisode && goToEpisode(slug, nextEpisode.slug)}
      >
        <ChevronRight />
      </Button>
    </div>
  );
};

export default NextPrev;
