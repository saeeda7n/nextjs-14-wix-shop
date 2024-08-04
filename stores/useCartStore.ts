import { create } from "zustand";
import { Cart } from "@wix/ecom_current-cart";
import { WixClient } from "@/providers/wixClientProvider";
import { toast } from "sonner";

type CartStore = {
 isLoading: boolean;
 cart: Cart;
 totalItems: number;
 deletingIds: string[];
 getCart: (wixClient: WixClient) => Promise<Cart>;
 addItem: (
  wixClient: WixClient,
  props: { productId: string; quantity: number; variantId?: string },
 ) => Promise<void>;
 removeItem: (wixClient: WixClient, itemId: string) => Promise<void>;
 clearStore: () => void;
};

export const useCartStore = create<CartStore>((set) => ({
 isLoading: true,
 totalItems: 0,
 cart: [],
 deletingIds: [],
 clearStore: () => set({ cart: undefined, isLoading: false, totalItems: 0 }),
 getCart: async (wixClient) => {
  try {
   const cart = await wixClient.currentCart.getCurrentCart();
   set({
    cart: cart,
    isLoading: false,
    totalItems: cart.lineItems.length,
   });
  } catch (e) {
  } finally {
   set({ isLoading: false });
  }
  return [];
 },
 addItem: async (wixClient, { productId, quantity, variantId }) => {
  const appId = process.env.NEXT_PUBLIC_WIX_APP_ID!;
  set({ isLoading: true });
  try {
  } catch (e) {}
  const { cart } = await wixClient.currentCart.addToCurrentCart({
   lineItems: [
    {
     catalogReference: {
      catalogItemId: productId,
      appId,
      ...(variantId && { options: { variantId } }),
     },
     quantity,
    },
   ],
  });
  set({
   cart: cart,
   isLoading: false,
   totalItems: cart?.lineItems.length || 0,
  });

  const latestProduct = cart!.lineItems.find(
   ({ rootCatalogItemId }) => rootCatalogItemId === productId,
  )!;
  toast.success("Product added to cart.", {
   description: `${quantity} of ${latestProduct.productName?.original} added to your cart.`,
  });
 },
 removeItem: async (wixClient, itemId) => {
  set((state) => ({
   deletingIds: (state.deletingIds.push(itemId), state.deletingIds),
  }));
  const { cart } = await wixClient.currentCart.removeLineItemsFromCurrentCart([
   itemId,
  ]);
  set((state) => {
   state.deletingIds.splice(state.deletingIds.indexOf(itemId), 1);
   return {
    cart,
    totalItems: cart?.lineItems.length,
    deletingIds: state.deletingIds,
   };
  });
 },
}));
