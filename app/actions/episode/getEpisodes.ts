// app/actions/episode/getEpisodes.ts
import { prisma } from "@/libs/db";

export async function getAllEpisodes() {
  return await prisma.episode.findMany({
    include: { drama: true },
    orderBy: { episodeNum: "asc" },
  });
}

export async function getEpisodeBySlug(slug: string) {
  try {
    const episode = await prisma.episode.findFirst({
      where: { slug },
      include: { drama: true },
    });

    if (!episode)
      return { success: false, message: "episode tidak di temukan" };

    return episode;
  } catch (error) {
    return error;
  }
}
