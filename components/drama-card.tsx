import { Card } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Image } from "@heroui/image";
import React from "react";
import NextImage from "next/image";

import { FireIcon } from "./icons";

interface DramaCardProps {
  title: string;
  image: string;
  episodeNum?: number;
  isPopular: boolean;
}

const DramaCard: React.FC<DramaCardProps> = ({
  title,
  image,
  episodeNum,
  isPopular,
}) => {
  return (
    <Card className="relative w-60 h-60 md:h-80 rounded-2xl overflow-hidden shadow-md transition-transform hover:scale-[1.03]">
      {/* Background image */}
      <Image
        fill
        priority
        removeWrapper
        alt={
          episodeNum
            ? `Poster drama melayu ${title} episode ${episodeNum}`
            : `Poster drama melayu ${title}`
        }
        as={NextImage}
        className="absolute inset-0 w-60 h-60 md:h-80 object-cover z-0"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        src={image}
      />

      {/* Gradient bottom overlay */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t dark:from-black/80 dark:via-black/40 to-transparent from-white/80 via-white/40 z-10" />

      {/* Text content */}
      <div className="absolute bottom-3 left-3 z-20">
        <h3 className="font-bold text-sm md:text-base leading-snug drop-shadow-md line-clamp-2">
          {title}
        </h3>
      </div>
      {!isPopular ? (
        <Chip
          className="text-xs absolute top-2 z-20 left-2"
          color="primary"
          size="sm"
          variant="shadow"
        >
          Episode {episodeNum}
        </Chip>
      ) : (
        <Chip
          className="text-xs absolute top-2 z-20 left-2 p-1"
          color="danger"
          radius="full"
          size="sm"
          variant="shadow"
        >
          <FireIcon />
        </Chip>
      )}
    </Card>
  );
};

export default DramaCard;
