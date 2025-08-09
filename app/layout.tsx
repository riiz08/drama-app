import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import Script from "next/script";
import { ToastProvider } from "@heroui/toast";

import { Providers } from "./providers";

import { fontSans } from "@/config/fonts";
import Navbar from "@/components/navbar";
import { ThemeSwitch } from "@/components/theme-switch";
import Footer from "@/components/footer";
import { Analytics } from "@vercel/analytics/next";

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
        <script
          async
          crossOrigin="anonymous"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4287822627580434"
        />
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
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <Script
          async
          data-key="OtQz1d0e2E+0YDRYqKFR/A"
          src="https://analytics.ahrefs.com/analytics.js"
        />
      </head>
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="overflow-x-hidden">
            <Navbar />
            <ToastProvider />
            <main className="mx-auto bg-background flex-grow">
              {children}
              <Analytics />
            </main>
            <div className="fixed bottom-5 right-5 p-2 z-[999] rounded-full shadow-none">
              <ThemeSwitch />
            </div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
