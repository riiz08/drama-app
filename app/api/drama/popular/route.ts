import getAllPopularDrama from "@/app/actions/drama/getAllPopularDrama";
import { NextResponse } from "next/server";
export async function GET(req: Request) {
  try {
    const data = await getAllPopularDrama();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error);
  }
}
