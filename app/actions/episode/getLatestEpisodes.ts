"use server";

import { prisma } from "@/libs/db";

export async function getLatestEpisodes(page = 1, limit = 8) {
  try {
    const skip = (page - 1) * limit;
    const [episodes, total] = await Promise.all([
      prisma.episode.findMany({
        orderBy: {
          releaseDate: "desc",
        },
        skip: skip,
        take: limit,
        include: {
          drama: true,
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
