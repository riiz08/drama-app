// app/api/revalidate/route.ts
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { path } = await req.json();

  revalidatePath(path);

  return NextResponse.json({ revalidate: path });
}
