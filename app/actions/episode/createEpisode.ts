"use server";

import { prisma } from "@/libs/db";
import { CreateEpisodeInput } from "@/types";

export async function createEpisode(data: CreateEpisodeInput) {
  try {
    const existing = await prisma.episode.findFirst({
      where: {
        dramaId: data.dramaId,
        OR: [{ slug: data.slug }, { episodeNum: data.episodeNum }],
      },
    });

    if (existing) {
      return {
        success: false,
        error: "Slug atau nomor episode sudah digunakan untuk drama ini.",
      };
    }

    const episode = await prisma.episode.create({
      data: {
        ...data,
        releaseDate: new Date(data.releaseDate),
        videoUrl: data.videoUrl || "",
      },
    });

    return { success: true, episode };
  } catch (error) {
    return {
      success: false,
      error: `Gagal membuat episode || ${error}`,
    };
  }
}
