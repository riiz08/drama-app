"use client";

import { Link } from "@heroui/link";
import { Skeleton } from "@heroui/skeleton";
import { useEffect, useState } from "react";
import { Pagination } from "@heroui/pagination";

import DramaCard from "./drama-card";

import { Episode } from "@/app/generated/prisma";

interface jsonResp {
  episodes: Episode[];
  total: number;
  totalPages: number;
  currentPage: number;
}

const LatestUpdate = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 8;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `/api/episodes/latest?page=${currentPage}&limit=8`,
        );
        const data = (await res.json()) as jsonResp;

        setEpisodes(data.episodes);
        setTotalPages(data.totalPages);
      } catch (error) {
        throw error;
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [currentPage]);

  return (
    <div>
      {isLoading ? (
        <div className="grid md:grid-cols-4 grid-cols-2 gap-3 md:gap-2 w-full">
          {Array(limit)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="rounded-lg">
                <div className="w-60 h-60 md:h-80" />
              </Skeleton>
            ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-5 grid-cols-2 gap-3 md:gap-2 w-full">
          {episodes.map((episode) => (
            <Link key={episode.slug} href={`/${episode.slug}`} target="_parent">
              <DramaCard
                episodeNum={episode.episodeNum}
                image={episode.drama.thumbnail}
                isPopular={false}
                title={episode.drama.title}
              />
            </Link>
          ))}
        </div>
      )}
      <div className="mx-auto my-4">
        <Pagination
          initialPage={currentPage}
          total={totalPages}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default LatestUpdate;
