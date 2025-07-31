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
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <ins
      ref={adRef}
      className="adsbygoogle"
      data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
      data-ad-format={format}
      data-ad-slot={slot}
      data-full-width-responsive={responsive ? "true" : "false"}
      style={style}
    />
  );
}
