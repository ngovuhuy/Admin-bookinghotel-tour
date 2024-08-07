import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const email = request.cookies.get("adminEmail");
  const roleName = request.cookies.get("roleName");
  if (roleName?.value !== "admin") {
    return NextResponse.redirect(
      new URL("/login?message=missingCredentials", request.url)
    );
  }
  return NextResponse.next();
  // if (email.value === "admin@gmail.com") {
   
  // }
  // return NextResponse.redirect(
  //   new URL("/login?message=notAuthorized", request.url)
  // );
}

export const config = {
  matcher: "/manage/:path*",
};