import { NextResponse } from "next/server";
// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  const token = request.cookies.get("token")?.value;
  console.log(token);
  const { pathname } = request.nextUrl;
  console.log(pathname);
  const publicRoute = pathname === "/login" || pathname === "/register";
  // console.log(publicRoute);
  if (!token && !publicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && publicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  // console.log(request.cookies.has("token"), "request");
}

export const config = {
  matcher: ["/login", "/register", "/"],
};
