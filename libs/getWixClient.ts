import { createClient, OAuthStrategy, TokenRole, Tokens } from "@wix/sdk";
import { products, collections } from "@wix/stores";
import { reviews } from "@wix/reviews";
import { cookies } from "next/headers";
import { currentCart } from "@wix/ecom";
import { cache } from "react";

export const getWixClient = cache(() => {
 const cookie =
  cookies().get("refreshToken")?.value ||
  cookies().get("visitor_refreshToken")?.value;
 const refreshToken = cookie
  ? JSON.parse(cookie)
  : { role: TokenRole.VISITOR, token: "" };
 return createClient({
  modules: {
   products,
   collections,
   reviews,
   currentCart,
  },
  auth: OAuthStrategy({
   clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
   tokens: { refreshToken } as Tokens,
  }),
 });
});
