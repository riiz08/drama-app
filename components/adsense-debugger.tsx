"use client";
import { useEffect } from "react";

export default function AdsenseDebugger() {
  useEffect(() => {
    console.log("✅ window.adsbygoogle:", window.adsbygoogle);
    console.log("✅ typeof push:", typeof window.adsbygoogle?.push);
  }, []);

  return null;
}
