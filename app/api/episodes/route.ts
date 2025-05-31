import { getLatestEpisodes } from "@/app/actions/episode/getLatestEpisodes";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 8;

  const data = await getLatestEpisodes(page, limit);

  return NextResponse.json(data);
}
