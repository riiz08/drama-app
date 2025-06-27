"use client";

import React from "react";
import { Link } from "@heroui/link";
import Heading from "./heading";
import DramaCard from "./drama-card";
import { Drama } from "@/app/generated/prisma";
import { Skeleton } from "@heroui/skeleton";

interface PopularProps {
  drama: Drama[];
  isLoading: boolean;
}

const PopularDrama: React.FC<PopularProps> = ({ drama, isLoading }) => {
  return (
    <>
      <Heading h1={false} href="/popular" title="Drama Populer" />
      {isLoading ? (
        <div className="py-2 grid md:grid-cols-5 grid-cols-2 gap-3 md:gap-2 w-full">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <Skeleton className="rounded-lg" key={i}>
                <div className="w-60 h-60 md:h-80" />
              </Skeleton>
            ))}
        </div>
      ) : (
        <div className="py-2 grid md:grid-cols-5 grid-cols-2 gap-3 md:gap-2 w-full">
          {drama.map((popular, i) => (
            <Link key={i} href={`/drama/${popular.slug}`} target="_parent">
              <DramaCard
                image={popular.thumbnail}
                isPopular={true}
                title={popular.title}
              />
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default PopularDrama;
