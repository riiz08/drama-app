import { useEffect, useRef } from "react";

const useAdsterraAds = ({
  socialBarScriptUrl,
  popunderScriptUrl,
  intervalMinutes = 5,
  shouldStartPopunder = false,
}: {
  socialBarScriptUrl: string;
  popunderScriptUrl: string;
  intervalMinutes?: number;
  shouldStartPopunder: boolean;
}) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Inject Social Bar immediately
    const socialScript = document.createElement("script");

    socialScript.src = socialBarScriptUrl;
    socialScript.async = true;
    socialScript.type = "text/javascript";
    document.body.appendChild(socialScript);

    return () => {
      if (document.body.contains(socialScript)) {
        document.body.removeChild(socialScript);
      }
    };
  }, [socialBarScriptUrl]);

  useEffect(() => {
    if (!shouldStartPopunder) return;

    const injectPopunder = () => {
      const script = document.createElement("script");

      script.src = popunderScriptUrl;
      script.async = true;
      script.type = "text/javascript";
      document.body.appendChild(script);

      setTimeout(() => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      }, 10000);
    };

    // Initial trigger
    injectPopunder();

    // Set interval
    intervalRef.current = setInterval(
      () => {
        injectPopunder();
      },
      intervalMinutes * 60 * 1000,
    );

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [shouldStartPopunder, popunderScriptUrl, intervalMinutes]);
};

export default useAdsterraAds;
