"use client";

import React, { createContext, PropsWithChildren, useState } from "react";

import { createClient, OAuthStrategy, Tokens } from "@wix/sdk";
import { products, collections } from "@wix/stores";
import { currentCart } from "@wix/ecom";
import { members } from "@wix/members";

const createWixClient = (clientId: string, tokens?: Tokens) =>
 createClient({
  modules: {
   products,
   collections,
   currentCart,
   members,
  },
  auth: OAuthStrategy({ clientId, tokens }),
 });

export type WixClient = ReturnType<typeof createWixClient>;

export const wixContext = createContext<{
 wixClient: WixClient;
} | null>(null);
const WixClientProvider = ({
 children,
 tokens,
}: {
 tokens?: Tokens;
} & PropsWithChildren) => {
 const [wixClient] = useState(() =>
  createWixClient(process.env.NEXT_PUBLIC_WIX_CLIENT_ID!, tokens),
 );
 return (
  <wixContext.Provider value={{ wixClient }}>{children}</wixContext.Provider>
 );
};

export default WixClientProvider;
