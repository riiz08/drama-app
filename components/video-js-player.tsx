"use client";

import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "@videojs/themes/dist/fantasy/index.css";
import Player from "video.js/dist/types/player";

type Props = {
  src: string;
};

const VideoJSPlayer = ({ src }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    const timer = setTimeout(() => {
      playerRef.current = videojs(videoRef.current!, {
        controls: true,
        fluid: true,
        autoplay: false,
        preload: "auto",
        techOrder: ["html5"],
        sources: [
          {
            src,
            type: "application/x-mpegURL",
          },
        ],
      });
    }, 0);

    return () => {
      clearTimeout(timer);
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [src]);

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js vjs-fantasy" playsInline />
    </div>
  );
};

export default VideoJSPlayer;
