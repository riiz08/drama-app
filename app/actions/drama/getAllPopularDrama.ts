"use server";

import { prisma } from "@/libs/db";

export default async function getAllPopularDrama() {
  try {
    const dramas = await prisma.drama.findMany({
      where: {
        isPopular: true,
      },
    });

    return dramas;
  } catch (error) {
    return [];
  }
}
