import { getSeoMetadata } from "@/libs/seo";
import HomeClient from "@/components/home-client";

export const metadata = getSeoMetadata({
  title: "Nonton Drama Melayu Terbaru 2025 | Streaming Gratis di MangEakk",
  description:
    "Streaming drama Melayu terbaru dari Malaysia, Brunei, dan Indonesia. Nikmati tayangan kualitas HD dengan subtitle, tanpa iklan!",
});

export default async function Home() {
  return <HomeClient />;
}
