import { prisma } from "@/libs/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ slug: string }>;
  }
) {
  try {
    const { slug } = await params;
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

    if (!drama) return NextResponse.json({ success: false, drama });

    return NextResponse.json({ success: true, drama });
  } catch (error) {
    return NextResponse.json(error);
  }
}
