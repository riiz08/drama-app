import { useEffect } from "react";

const StickySocialBar = () => {
  useEffect(() => {
    const script = document.createElement("script");

    script.src =
      "//comelysouthbuilds.com/6b/61/56/6b61565cfcca3a10ad6fb576bb075de5.js";
    script.type = "text/javascript";
    script.async = false;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 pointer-events-none">
      {/* Adsterra Social Bar akan render sendiri */}
    </div>
  );
};

export default StickySocialBar;
