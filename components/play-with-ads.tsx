"use client";

import React, { useState } from "react";

import VideoPlayer from "./video-player";

import useAdsterraAds from "@/hooks/useAdsterra";

interface PlayWithAdsProps {
  src: string;
}

const PlayWithAds: React.FC<PlayWithAdsProps> = ({ src }) => {
  const [hasPlayed, setHasPlayed] = useState(false);

  useAdsterraAds({
    socialBarScriptUrl:
      "//comelysouthbuilds.com/6b/61/56/6b61565cfcca3a10ad6fb576bb075de5.js",
    popunderScriptUrl:
      "//comelysouthbuilds.com/b2/5a/35/b25a352547c63a8a406bc8114678a2e3.js",
    intervalMinutes: 5,
    shouldStartPopunder: hasPlayed,
  });

  return <VideoPlayer src={src} onPlay={() => setHasPlayed(true)} />;
};

export default PlayWithAds;
