import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { ToastProvider } from "@heroui/toast";
import { Providers } from "./providers";
import { fontSans } from "@/config/fonts";
import Navbar from "@/components/navbar";
import Script from "next/script";

export const metadata: Metadata = {
  icons: {
    icon: "/logo/logo.png",
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
    <html suppressHydrationWarning lang="en">
      <head>
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
            <ToastProvider />
            <main className="container mx-auto max-w-7xl bg-background pt-4 px-6 flex-grow">
              {children}
            </main>
            <footer className="text-sm p-4 text-center bg-content1 my-4">
              <aside>
                <p>
                  Copyright © {new Date().getFullYear()} - All right reserved
                  by MangEakkk Dev
                </p>
              </aside>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
