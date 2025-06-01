import { prisma } from "@/libs/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 8;

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

    return NextResponse.json({
      episodes,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    return NextResponse.json({
      episodes: [],
      total: 0,
      totalPages: 0,
      currentPage: page,
    });
  }
}
