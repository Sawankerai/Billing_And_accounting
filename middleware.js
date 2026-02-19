import { NextResponse } from "next/server";

export function middleware(request) {
  const user = request.cookies.get("user")?.value;

  // if user cookie not present → go login
  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const parsedUser = JSON.parse(user);

    if (!parsedUser.isAuthenticated || parsedUser.role !== "admin") {
      return NextResponse.redirect(new URL("/login", request.url));
    }

  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"], // protect dashboard routes
};