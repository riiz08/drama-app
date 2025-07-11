import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const maintenanceMode = false; // Ubah jadi `false` kalau mau normal kembali

  const url = request.nextUrl.clone();

  if (
    maintenanceMode &&
    !url.pathname.startsWith("/maintenance") &&
    !url.pathname.startsWith("/_next") &&
    !url.pathname.startsWith("/favicon.ico")
  ) {
    url.pathname = "/maintenance";

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
