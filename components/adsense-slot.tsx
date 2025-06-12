"use client";

import { useEffect, useRef } from "react";

interface Props {
  slot: string;
  format?: string;
  responsive?: boolean;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function AdsenseSlot({
  slot,
  format = "auto",
  responsive = true,
  className = "",
}: Props) {
  const insRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      // Trigger AdSense to render this slot
      if (insRef.current && insRef.current.querySelector("ins.adsbygoogle")) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.warn(`[AdSense Slot ${slot}] Failed to push ad:`, e);
    }
  }, []);

  return (
    <div ref={insRef} className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      ></ins>
    </div>
  );
}
