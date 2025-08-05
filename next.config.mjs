// @ts-check

import { execSync } from "child_process";

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
  generateBuildId: async () => {
    try {
      const gitHash = execSync("git rev-parse --short HEAD").toString().trim();
      return "build-" + gitHash;
    } catch (error) {
      return "build-" + Date.now();
    }
  },
};

export default nextConfig;
