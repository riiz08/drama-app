/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ["app", "components"],
  },
  images: {
    remotePatterns: [
      {
        hostname: "sadjajsd.b-cdn.net",
      },
    ],
  },
};

module.exports = nextConfig;
