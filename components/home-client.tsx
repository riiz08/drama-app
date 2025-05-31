"use client";

import { useEffect, useState } from "react";
import { Link } from "@heroui/link";
import { ScrollShadow } from "@heroui/scroll-shadow";
import Heading from "@/components/heading";
import DramaCard from "@/components/drama-card";
import PopularDrama from "@/components/popular-drama";
import ListBoxUpdate from "@/components/list-box-update";
import { Pagination } from "@heroui/pagination";
import { Drama, Episode } from "@/app/generated/prisma";
import CarouselSlider from "./carousel";
import { Spinner } from "@heroui/spinner";
import Navbar from "./navbar";

interface jsonResp {
  episodes: Episode[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export default function HomeClient() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [populars, setPopulars] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 8;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/episodes?page=${currentPage}&limit=8`);
        const data = (await res.json()) as jsonResp;
        const popDrama = await fetch("/api/drama/popular");
        const popData = (await popDrama.json()) as Drama[];
        setEpisodes(data.episodes);
        setTotalPages(data.totalPages);
        setPopulars(popData);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [currentPage]);

  // if (isLoading)
  //   return (
  //     <Spinner
  //       className="fixed inset-0 z-[9999] flex items-center justify-center"
  //       variant="wave"
  //     />
  //   );

  return (
    <>
      <section className="flex justify-center md:justify-between w-fit items-start gap-2 flex-col md:flex-row">
        <div className="md:w-4/5">
          <CarouselSlider />
          <ScrollShadow
            hideScrollBar
            className="h-20 md:h-16 my-2 bg-content1 p-2 rounded-md"
          >
            <p className="text-tiny">
              <Link
                className="font-semibold text-tiny mr-1"
                color="foreground"
                href="/"
              >
                MangEakk Drama
              </Link>
              ialah laman streaming percuma untuk tonton drama Melayu terkini
              dan drama Malaysia full episod. Nikmati tayangan berkualiti dengan
              subtitle Melayu dan Indonesia, sesuai untuk penonton dari
              Malaysia, Brunei, Singapura, dan Indonesia. Laman ini sentiasa
              dikemas kini dengan drama terbaru 2025 setiap minggu.
            </p>
          </ScrollShadow>
          <div>
            <Heading href="/latest-update" title="Rilis terbaru" />
            {isLoading ? (
              <div className="grid md:grid-cols-4 grid-cols-2 gap-3 md:gap-2 w-full">
                {Array(limit)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="w-60 h-60 md:h-80 bg-gray-300 animate-pulse rounded-2xl"
                    />
                  ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-4 grid-cols-2 gap-3 md:gap-2 w-full">
                {episodes.map((episode) => (
                  <Link key={episode.slug} href={`/${episode.slug}`}>
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
            <div className="mx-auto mb-4">
              <Pagination
                initialPage={currentPage}
                total={totalPages}
                onChange={(page) => setCurrentPage(page)}
              />
            </div>
            <PopularDrama drama={populars} />
          </div>
        </div>
        <ListBoxUpdate episodes={episodes} />
      </section>
    </>
  );
}
