"use server";

import { prisma } from "@/libs/db";

export async function getAllPopularDrama() {
  try {
    const dramas = await prisma.drama.findMany({
      where: {
        isPopular: true,
      },
      orderBy: {
        releaseDate: "desc",
      },
      select: {
        id: true,
        title: true,
        slug: true,
        thumbnail: true,
        releaseDate: true,
        status: true,
        totalEpisode: true,
      },
    });

    return dramas;
  } catch (error) {
    console.error("Failed to fetch popular dramas:", error);
    return [];
  }
}
