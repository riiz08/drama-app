"use client";

import { useEffect } from "react";

const GoogleAdsense = () => {
  useEffect(() => {
    const scriptId = "adsbygoogle-init";

    if (document.getElementById(scriptId)) return;

    const script = document.createElement("script");
    script.id = scriptId;
    script.src =
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4287822627580434";
    script.async = true;
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);
  }, []);
  return null;
};

export default GoogleAdsense;
