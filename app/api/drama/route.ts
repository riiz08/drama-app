import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/db";

export async function POST(req: NextRequest) {
  try {
    const { title } = await req.json();
    const drama = await prisma.drama.findMany({
      where: {
        title: {
          mode: "insensitive",
          contains: title,
        },
      },
      take: 10,
      orderBy: {
        title: "asc",
      },
      include: {
        episodes: {
          orderBy: { episodeNum: "asc" },
        },
      },
    });

    if (!drama) return NextResponse.json({ success: false, drama });

    return NextResponse.json({ success: true, drama });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
