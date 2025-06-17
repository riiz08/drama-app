import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { ToastProvider } from "@heroui/toast";
import { Providers } from "./providers";
import { fontSans } from "@/config/fonts";
import Navbar from "@/components/navbar";
import Script from "next/script";
import Footer from "@/components/footer";
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
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="OtQz1d0e2E+0YDRYqKFR/A"
          async
        />
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
          <main className="mx-auto bg-background flex-grow">{children}</main>
          <div className="fixed bottom-5 right-5 p-2 z-[999] rounded-full shadow-none">
            <ThemeSwitch />
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
