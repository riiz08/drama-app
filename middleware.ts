import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;

  if (url.searchParams.has("bypass")) {
    url.searchParams.delete("bypass");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
