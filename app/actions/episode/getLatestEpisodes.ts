"use server";

import { prisma } from "@/libs/db";

export async function getLatestEpisodes(page: number = 1, limit: number = 8) {
  const skip = (page - 1) * limit;

  try {
    const [episodes, total] = await Promise.all([
      prisma.episode.findMany({
        orderBy: {
          releaseDate: "desc",
        },
        skip,
        take: limit,
        include: {
          drama: {},
        },
      }),
      prisma.episode.count(),
    ]);

    return {
      episodes,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    };
  } catch (error) {
    return {
      episodes: [],
      total: 0,
      totalPages: 0,
      currentPage: page,
    };
  }
}
