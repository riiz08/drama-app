// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  eslint: {
    dirs: ["app", "components"],
  },
  images: {
    remotePatterns: [
      {
        hostname: "cdn.mangeakkk.my.id",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' https://pagead2.googlesyndication.com https://www.googletagservices.com 'unsafe-inline' 'unsafe-eval'; frame-src https://*.google.com https://*.doubleclick.net; child-src https://*.google.com https://*.doubleclick.net; object-src 'none';",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
