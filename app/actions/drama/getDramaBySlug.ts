import { prisma } from "@/libs/db";

export const getDramaBySlug = async (slug: string) => {
  try {
    const drama = await prisma.drama.findUnique({
      where: { slug },
      include: {
        episodes: {
          orderBy: { episodeNum: "asc" },
        },
      },
    });

    if (!drama) return { success: false, drama: null };

    return { success: true, drama };
  } catch (error) {
    return {
      success: false,
      drama: null,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
