import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const header = JSON.stringify(Object.fromEntries(req.headers), null, 2);

  return NextResponse.json({ header });
}
