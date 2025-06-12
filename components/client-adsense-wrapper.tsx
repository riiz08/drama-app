"use client";

import dynamic from "next/dynamic";

const AdsenseSlot = dynamic(() => import("./adsense-slot"), {
  ssr: false,
});

export default function ClientAdsenseWrapper({ slot }: { slot: string }) {
  return <AdsenseSlot slot={slot} />;
}
