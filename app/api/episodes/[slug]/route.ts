import { prisma } from "@/libs/db";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  {
    params,
  }: {
    params: Promise<{ slug: string }>;
  }
) => {
  try {
    const { slug } = await params;
    const episode = await prisma.episode.findFirst({
      where: { slug },
      include: { drama: true },
    });

    if (!episode)
      return NextResponse.json({ success: false, episode: episode });

    return NextResponse.json({ success: true, episode });
  } catch (error) {
    return NextResponse.json({ error });
  }
};
