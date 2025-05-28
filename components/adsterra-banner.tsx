"use client";

import { useEffect, useRef } from "react";

const AdsterraBanner = () => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");

    script.type = "text/javascript";
    script.src =
      "//comelysouthbuilds.com/d239af39967817bd6250bf88ab82e50e/invoke.js";
    script.async = true;

    const wrapper = document.createElement("script");

    wrapper.innerHTML = `
      atOptions = {
        'key' : 'd239af39967817bd6250bf88ab82e50e',
        'format' : 'iframe',
        'height' : 90,
        'width' : 728,
        'params' : {}
      };
    `;
    adRef.current?.appendChild(wrapper);
    adRef.current?.appendChild(script);

    return () => {
      if (adRef.current) {
        adRef.current.innerHTML = "";
      }
    };
  }, []);

  return <div ref={adRef} className="flex justify-center" />;
};

export default AdsterraBanner;
