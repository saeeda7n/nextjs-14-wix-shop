"use client";
import { useWix } from "@/hooks/useWix";
import {
 Popover,
 PopoverButton,
 PopoverPanel,
 Transition,
} from "@headlessui/react";
import { Loader, ShoppingBasket } from "lucide-react";
import React, { useEffect, useMemo } from "react";
import Image from "next/image";
import { Cart, LineItem } from "@wix/ecom_current-cart";
import { media } from "@wix/sdk";
import Link from "next/link";
import { useCartStore } from "@/stores/useCartStore";
import { toast } from "sonner";

type CartItem = {
 item: LineItem;
 onRemove?: (id: string) => void;
 isRemovePending?: boolean;
};

type CartItemsProps = {
 cart: Cart;
};

function EmptyCart() {
 return (
  <div className="flex w-full flex-col items-center justify-center gap-5 py-5">
   <Image
    src={"/assets/images/illustrations/undraw_happy_music_g6wc.svg"}
    alt="Empty Cart"
    className="w-44 select-none"
    width={512}
    height={512}
    draggable={false}
   />
   <p className="text-sm font-semibold">Your cart is empty :(</p>
  </div>
 );
}

function CartItem({ item, onRemove, isRemovePending }: CartItem) {
 const imageSrc = media.getScaledToFillImageUrl(item.image!, 512, 512, {
  quality: 70,
 });
 return (
  <div className="flex gap-2">
   <div className="h-24 w-20 flex-shrink-0">
    <Image
     draggable={false}
     className="h-full w-full rounded-md bg-gray-200 object-cover object-center"
     width={128}
     height={256}
     src={imageSrc}
     alt={item.productName?.original!}
    />
   </div>
   <div className="flex w-full flex-col justify-between py-1">
    <div className="flex w-full flex-col">
     <div className="flex items-center justify-between">
      <Link
       href={`/products/${item.url?.split("/").at(-1)}`}
       className="font-medium"
      >
       {item.productName?.original}
      </Link>
      <div className="font-semibold">{item.price?.formattedAmount}</div>
     </div>
     <div className="text-xs font-medium text-gray-500">
      {item.availability?.status}
     </div>
    </div>
    <div className="flex items-center justify-between">
     <span className="text-xs font-semibold">Qty: {item.quantity}</span>
     <button
      disabled={isRemovePending}
      className="flex min-w-8 items-center justify-center text-xs font-medium text-red-500"
      onClick={() => onRemove && onRemove(item._id!)}
     >
      {isRemovePending ? (
       <Loader size={12} className="animate-spin" />
      ) : (
       "Remove"
      )}
     </button>
    </div>
   </div>
  </div>
 );
}

function CartItems({ cart }: CartItemsProps) {
 const removeItem = useCartStore((state) => state.removeItem);
 const deletingIds = useCartStore((state) => state.deletingIds);
 const wix = useWix();

 return (
  <div className="mt-3">
   <div className="flex flex-col gap-2">
    {cart.lineItems?.map((cart) => (
     <CartItem
      item={cart}
      key={cart._id}
      onRemove={(id) => removeItem(wix, id)}
      isRemovePending={deletingIds.includes(cart._id!)}
     />
    ))}
   </div>
   <div className="mt-6 block space-y-1 rounded-lg transition hover:bg-white/5">
    <div className="flex items-center justify-between font-semibold">
     <span className="text-base/4">Subtotal</span>
     <span className="text-base/4">
      {
       //@ts-ignore
       cart?.subtotal?.formattedAmount
      }
     </span>
    </div>
    <p className="text-xs font-medium text-gray-500">
     Shipping and taxes calculated at check out.
    </p>
   </div>
   <div className="mt-4 flex items-center justify-between pb-3">
    <Link
     href="/cart"
     className="flex h-10 items-center justify-center rounded-lg border px-5 font-medium"
    >
     View Cart
    </Link>
    <button
     onClick={() =>
      toast("This feature is not available.", {
       description: "Payment and check out are limited for wix free plan.",
       id: "wix_free_plan",
      })
     }
     className="flex h-10 items-center justify-center rounded-lg bg-black px-5 font-medium text-gray-50"
    >
     Check out
    </button>
   </div>
  </div>
 );
}

export function CartPopover() {
 const wix = useWix();
 const { getCart, isLoading, cart, totalItems } = useCartStore();
 const refreshToken = wix.auth.getTokens().refreshToken;
 useEffect(() => {
  getCart(wix);
 }, [refreshToken]);
 return (
  <Popover>
   <PopoverButton disabled={isLoading} className="relative focus:outline-none">
    <span className="absolute -right-1 -top-2.5 flex h-5 items-center justify-center rounded-full bg-emerald-500 px-1 text-xs font-semibold text-gray-50">
     {isLoading ? <Loader className="animate-spin" size={12} /> : totalItems}
    </span>
    <ShoppingBasket />
   </PopoverButton>
   <Transition
    enter="transition ease-out duration-200"
    enterFrom="opacity-0 translate-y-1"
    enterTo="opacity-100 translate-y-0"
    leave="transition ease-in duration-150"
    leaveFrom="opacity-100 translate-y-0"
    leaveTo="opacity-0 translate-y-1"
   >
    <PopoverPanel
     anchor="bottom end"
     className="z-50 rounded-xl border bg-white text-sm/6 text-gray-950 selection:bg-emerald-500 selection:text-gray-50"
    >
     <div className="max-h-96 p-3">
      {cart && cart.lineItems && (
       <h3 className="text-lg font-medium">Shopping Cart</h3>
      )}
      <div className="min-w-64 max-w-72">
       {cart && cart.lineItems?.length ? (
        <CartItems cart={cart} />
       ) : (
        <EmptyCart />
       )}
      </div>
     </div>
    </PopoverPanel>
   </Transition>
  </Popover>
 );
}
