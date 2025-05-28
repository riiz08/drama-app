"use client";

import { useEffect, useRef } from "react";

export default function AdsterraBanner469x60() {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");

    script.type = "text/javascript";
    // Pasang konfigurasi setelah komponen ter-mount
    // @ts-ignore: window.atOptions tidak didefinisikan oleh default
    script.src =
      "//comelysouthbuilds.com/3ca35e43e92d25034e072abe70e36425/invoke.js";
    script.async = true;

    const wrapper = document.createElement("script");

    wrapper.innerHTML = `
      atOptions = {
       'key' : '3ca35e43e92d25034e072abe70e36425',
		'format' : 'iframe',
		'height' : 60,
		'width' : 468,
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

  return <div ref={adRef} className="flex mt-4 w-1/2 mx-auto justify-center" />;
}
