import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const email = request.cookies.get("adminEmail");
  if (!email) {
    return NextResponse.redirect(
      new URL("/login?message=missingCredentials", request.url)
    );
  }

  if (email.value === "admin@gmail.com") {
    return NextResponse.next();
  }
  return NextResponse.redirect(
    new URL("/login?message=notAuthorized", request.url)
  );
}

export const config = {
  matcher: "/manage/:path*",
};
