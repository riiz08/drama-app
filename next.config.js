/** @type {import('next').NextConfig} */
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
};

module.exports = nextConfig;
