// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { keySession } from "@/lib/constants";

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get(keySession);

  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next(); // biar useAuth bisa handle validitas expired-nya
}

export const config = {
  matcher: [
    "/",
    "/info-pasien/:path*",
    "/master/:path*",
    "/order/:path*",
    "/settings/:path*",
  ],
};
