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
      </head>
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            <Navbar />
            <AdsenseSlot slot="5978949902" />
            <ToastProvider />
            <main className="container mx-auto max-w-7xl bg-background pt-4 px-6 flex-grow">
              {children}
            </main>
            <AdsenseSlot slot="3927501637" />
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
