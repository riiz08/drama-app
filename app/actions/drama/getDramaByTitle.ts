"use server";

import { prisma } from "@/libs/db";

export const getDramaByTitle = async (title: string) => {
  try {
    const drama = await prisma.drama.findFirst({
      where: {
        title: {
          equals: title,
          mode: "insensitive",
        },
      },
      include: {
        episodes: {
          orderBy: { episodeNum: "asc" },
        },
      },
    });

    if (!drama) return { success: false, drama };

    return { success: true, drama };
  } catch (error) {
    return error;
  }
};
