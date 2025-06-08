"use client";

import React, { useEffect, useState } from "react";
import ListBoxUpdate from "./list-box-update";
import { Episode } from "@/app/generated/prisma";
import { useWindowWidth } from "@/hooks/useWindowWidth";

interface jsonResp {
  episodes: Episode[];
  total: number;
  totalPages: number;
  currentPage: number;
}

const BoxUpdateFetch = () => {
  const [episodes, setEpisodes] = useState<any[]>([]);
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
    }
    fetchData();
  }, [limit]);

  return <ListBoxUpdate episodes={episodes} />;
};

export default BoxUpdateFetch;
