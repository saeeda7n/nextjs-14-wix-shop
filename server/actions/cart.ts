"use server";

import { revalidatePath } from "next/cache";
import { getWixClient } from "@/libs/getWixClient";

export async function removeCouponFromCurrentCart() {
 const wix = getWixClient();
 await wix.currentCart.removeCouponFromCurrentCart();
 revalidatePath("/cart");
}

export async function applyCoupon(code: string) {
 const wix = getWixClient();
 await wix.currentCart.updateCurrentCart({ couponCode: code });
 revalidatePath("/cart");
}

export async function removeLineItemsFromCurrentCart(itemId: string) {
 const wix = getWixClient();
 const result = await wix.currentCart.removeLineItemsFromCurrentCart([itemId]);
 revalidatePath("/cart");
 return result;
}
