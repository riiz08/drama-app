"use server";

import { prisma } from "@/libs/db";

export async function getAllDramas() {
  return await prisma.drama.findMany({
    where: {
      status: "ONGOING",
    },
    orderBy: {
      title: "asc",
    },
  });
}
