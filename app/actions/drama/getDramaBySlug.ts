"use server";

import { prisma } from "@/libs/db";

export const getDramaBySlug = async (slug: string) => {
  try {
    const drama = await prisma.drama.findFirst({
      where: {
        slug,
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
