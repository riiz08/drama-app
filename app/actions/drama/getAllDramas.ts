"use server";

import { prisma } from "@/libs/db";

export async function getAllDramas() {
  return await prisma.drama.findMany({
    orderBy: {
      title: "asc",
    },
  });
}
