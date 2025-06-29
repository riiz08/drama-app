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
  style = { display: "block", minHeight: "100px" },
  format = "auto",
  responsive = true,
}: AdsenseSlotProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pushedRef = useRef(false);

  useEffect(() => {
    if (pushedRef.current) return;

    const tryPush = () => {
      if (
        window.adsbygoogle &&
        typeof window.adsbygoogle.push === "function" &&
        adRef.current
      ) {
        try {
          window.adsbygoogle.push({});
          pushedRef.current = true; // 👈 jangan push dua kali
        } catch (e) {
          console.error("[AdSense] push error:", e);
        }
      } else {
        setTimeout(tryPush, 300);
      }
    };

    tryPush();
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
      key={slot}
    />
  );
}
