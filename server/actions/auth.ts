"use server";

import { Tokens } from "@wix/sdk";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { getWixClient } from "@/libs/getWixClient";

export async function setCookies(tokens: Tokens) {
 cookies().set("refreshToken", JSON.stringify(tokens.refreshToken), {
  maxAge: 3600 * 24 * 60,
 });
}

export async function logout() {
 const wix = getWixClient();
 // const visitor = wix.auth.generateVisitorTokens();
 cookies().delete("refreshToken");
 revalidatePath("/", "layout");
}

export async function setVisitor(tokens: Tokens) {
 cookies().set("visitor_refreshToken", JSON.stringify(tokens.refreshToken), {
  maxAge: 3600 * 24 * 60,
 });
}
