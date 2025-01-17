import { betterFetch } from "@better-fetch/fetch";
import type { auth } from "@/lib/auth";
import { NextResponse, type NextRequest } from "next/server";
import { NextURL } from "next/dist/server/web/next-url";

type Session = typeof auth.$Infer.Session;

export default async function authMiddleware(request: NextRequest) {
  console.log(request);
  const { pathname } = request.nextUrl;

  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: request.nextUrl.origin,
      headers: {
        //get the cookie from the request
        cookie: request.headers.get("cookie") || "",
      },
    }
  );

  console.log(session);

  if (!session && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  } else if (session) {
    if (pathname === "/login") {
      const url = new NextURL("/home", request.url);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  // Protect dashboard route and sub-routes
  matcher: ["/home", "/login"],
};
