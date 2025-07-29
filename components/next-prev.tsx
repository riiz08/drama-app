"use client";

import { Button } from "@heroui/button";
import React from "react";
import { ChevronLeft } from "./icons";
import { ChevronRight } from "./heading";
import { Episode } from "@/app/generated/prisma";
import { useRouter } from "next/navigation";

interface NextPrevProps {
  episodes: Episode[];
  slug: string;
}

const NextPrev: React.FC<NextPrevProps> = ({ episodes, slug }) => {
  const router = useRouter();

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

  const goToEpisode = (slugEp: string) => {
    router.push(`/${slugEp}`);
  };

  return (
    <div className="flex justify-center my-2 items-center gap-1">
      <Button
        fullWidth
        color="primary"
        isDisabled={!prevEpisode}
        variant="shadow"
        onPress={() => prevEpisode && goToEpisode(prevEpisode.slug)}
      >
        <ChevronLeft />
      </Button>
      <Button isDisabled>
        {/* Kalau ini tombol tengah mungkin buat show menu episode */}
        {/* Placeholder icon */}
      </Button>
      <Button
        fullWidth
        color="primary"
        isDisabled={!nextEpisode}
        variant="shadow"
        onPress={() => nextEpisode && goToEpisode(nextEpisode.slug)}
      >
        <ChevronRight />
      </Button>
    </div>
  );
};

export default NextPrev;
