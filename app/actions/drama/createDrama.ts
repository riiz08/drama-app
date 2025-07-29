"use server";

import { Status } from "@/app/generated/prisma";
import { prisma } from "@/libs/db";
import { CreateDramaInput } from "@/types";

// server action (create-drama.ts)
export async function createDrama(data: CreateDramaInput) {
  try {
    const drama = await prisma.drama.create({
      data: {
        ...data,
        releaseDate: new Date(data.releaseDate),
        status: data.status as Status,
      },
    });

    return { success: true, drama };
  } catch (error) {
    return {
      success: false,
      error: "Failed to create drama",
    };
  }
}
