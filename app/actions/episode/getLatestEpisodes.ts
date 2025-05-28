"use server";

import { prisma } from "@/libs/db";

export async function getLatestEpisodes(limit = 8) {
  try {
    const episodes = await prisma.episode.findMany({
      orderBy: {
        releaseDate: "desc", // urutkan berdasarkan tanggal rilis
      },
      take: limit,
      include: {
        drama: true, // jika kamu ingin info drama-nya juga
      },
    });

    return episodes;
  } catch (error) {
    return [];
  }
}
