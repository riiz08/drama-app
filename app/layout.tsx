import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { ToastProvider } from "@heroui/toast";
import { Providers } from "./providers";
import { fontSans } from "@/config/fonts";
import Navbar from "@/components/navbar";
import Script from "next/script";
import Footer from "@/components/footer";
import AdsenseSlot from "@/components/adsense-slot";
import GoogleAdsense from "@/components/google-adsense";
import { ThemeSwitch } from "@/components/theme-switch";

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="ms">
      <head>
        <GoogleAdsense />
        <Script
          async
          id="gtag"
          src="https://www.googletagmanager.com/gtag/js?id=G-MG1B3ZG1YZ"
        />
        <Script id="gtag2">
          {` window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-MG1B3ZG1YZ')`}
        </Script>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <Script id="histats-script" strategy="afterInteractive">
          {`
            var _Hasync= _Hasync|| [];
            _Hasync.push(['Histats.start', '1,4956141,4,511,95,18,00000000']);
            _Hasync.push(['Histats.fasi', '1']);
            _Hasync.push(['Histats.track_hits', '']);
            (function() {
              var hs = document.createElement('script'); hs.type = 'text/javascript'; hs.async = true;
              hs.src = ('//s10.histats.com/js15_as.js');
              (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(hs);
            })();
          `}
        </Script>
      </head>
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <Navbar />
          <ToastProvider />
          <main className="mx-auto bg-background flex-grow">
            <AdsenseSlot slot="5978949902" />
            {children}
          </main>
          <div
            id="histats_counter"
            className="mt-2 absolute left-1/2 transform -translate-x-1/2"
          />

          {/* Fallback untuk non-JS browser */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <noscript>
            <a href="/" target="_blank">
              <img
                src="//sstatic1.histats.com/0.gif?4956141&101"
                alt="histats"
                style={{ border: 0 }}
              />
            </a>
          </noscript>
          <div className="fixed bottom-5 right-5 p-2 z-[999] rounded-full shadow-none">
            <ThemeSwitch />
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
