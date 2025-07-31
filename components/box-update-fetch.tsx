"use client";

import React, { useEffect, useState } from "react";

import ListBoxUpdate from "./list-box-update";
import BoxAllDrama from "./box-all-drama";

import { Episode } from "@/app/generated/prisma";
import { useWindowWidth } from "@/hooks/useWindowWidth";

interface jsonResp {
  episodes: Episode[];
  total: number;
  totalPages: number;
  currentPage: number;
}

interface Drama {
  id: string;
  slug: string;
  releaseDate: Date;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string;
  thumbnail: string;
  status: string;
  totalEpisode: number;
  airTime: string;
  isPopular: boolean;
  episodes: Episode[];
}

interface JsonDrama {
  drama: Drama[];
  success: boolean;
}

const BoxUpdateFetch = () => {
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [dramas, setDramas] = useState<any[]>([]);
  const [limit, setLimit] = useState(8);
  const windowWidth = useWindowWidth();

  useEffect(() => {
    if (windowWidth) {
      if (windowWidth > 768) setLimit(20);
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/episodes/latest?page=1&limit=${limit}`);
      const data = (await res.json()) as jsonResp;

      setEpisodes(data.episodes);
      const resDrama = await fetch(`/api/drama`);
      const dataDrama = (await resDrama.json()) as JsonDrama;

      setDramas(dataDrama.drama);
    }
    fetchData();
  }, [limit]);

  return (
    <div>
      <ListBoxUpdate episodes={episodes} />
      <BoxAllDrama dramas={dramas} />
    </div>
  );
};

export default BoxUpdateFetch;
