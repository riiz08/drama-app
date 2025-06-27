"use client";

import Script from "next/script";

const GoogleAdsense = () => {
  return (
    <Script
      strategy="afterInteractive"
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4287822627580434"
      crossOrigin="anonymous"
    />
  );
};

export default GoogleAdsense;
