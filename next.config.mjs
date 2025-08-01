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
            value: `
default-src * data: blob: 'unsafe-inline' 'unsafe-eval';
script-src * data: blob: 'unsafe-inline' 'unsafe-eval';
style-src * data: blob: 'unsafe-inline';
img-src * data: blob:;
frame-src *;
connect-src *;
font-src * data:;
media-src *;
object-src *;
`.replace(/\n/g, ""),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
