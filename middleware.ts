import { createClient, OAuthStrategy } from "@wix/sdk";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
 const member = request.cookies.get("refreshToken");
 const visitor = request.cookies.get("visitor_refreshToken");
 const response = NextResponse.next();
 if (member || visitor) return response;
 const wix = createClient({
  auth: OAuthStrategy({ clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID! }),
 });
 const token = await wix.auth.generateVisitorTokens();
 response.cookies.set(
  "visitor_refreshToken",
  JSON.stringify(token.refreshToken),
  { maxAge: 3600 * 24 * 30 },
 );
 return response;
}
