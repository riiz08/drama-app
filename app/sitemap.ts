import { MetadataRoute } from "next";

import { getAllEpisodes } from "./actions/episode/getEpisodes";

import { getAllDramas } from "@/app/actions/drama/getAllDramas";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://mangeakkk.my.id";

  const dramas = await getAllDramas();
  const episodes = await getAllEpisodes();

  const urls: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/drama`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/popular`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/latest-update`,
      lastModified: new Date(),
    },
    ...dramas.map((drama) => ({
      url: `${baseUrl}/drama/${drama.slug}`,
      lastModified: new Date(drama.updatedAt ?? drama.createdAt),
    })),
    ...episodes.map((ep) => ({
      url: `${baseUrl}/${ep.slug}`,
      lastModified: new Date(ep.updatedAt ?? ep.releaseDate),
    })),
  ];

  return urls;
}
