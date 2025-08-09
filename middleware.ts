// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;

  if (url.pathname.includes("--")) {
    const correctedPath = url.pathname.replace(/--+/g, "-");
    url.pathname = correctedPath;
    return NextResponse.redirect(url);
  }

  if (url.pathname === "/" && !url.searchParams.has("v")) {
    url.searchParams.set("v", Date.now().toString());
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
