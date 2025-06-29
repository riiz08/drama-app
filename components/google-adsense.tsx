"use client";

import { useEffect } from "react";

export default function GoogleAdsense() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4287822627580434";
    script.async = true;
    script.crossOrigin = "anonymous";

    script.onload = () => {
      console.log("[AdSense] SDK loaded");
      window.adsbygoogle = window.adsbygoogle || [];
    };

    // Inject ke <head> bukan <body>
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
}
