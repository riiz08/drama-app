"use client";

import { useEffect, useRef } from "react";

interface AdsenseSlotProps {
  slot: string;
  style?: React.CSSProperties;
  format?: string;
  responsive?: boolean;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function AdsenseSlot({
  slot,
  style = { display: "block" },
  format = "auto",
  responsive = true,
}: AdsenseSlotProps) {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("[AdSense] Error pushing ad:", e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={style}
      data-ad-client="ca-pub-4287822627580434"
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive ? "true" : "false"}
      ref={adRef}
    />
  );
}
