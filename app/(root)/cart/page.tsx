import React from "react";
import { getWixClient } from "@/libs/getWixClient";
import { Cart, LineItem } from "@wix/ecom_current-cart";
import { media } from "@wix/sdk";
import Image from "next/image";
const ViewCartPage = async () => {
 const wix = getWixClient();

 let cart: Cart | null;
 try {
  cart = await wix.currentCart.getCurrentCart();
  // await wix.currentCart.updateCurrentCart({ couponCode: "DEMO" });
 } catch (e) {
  cart = null;
 }
 return (
  <main className="min-h-[calc(100vh-32.1rem)] pt-10">
   <div className="space-y-5">
    <h1 className="container text-2xl font-semibold">Categories</h1>
    <div className="container flex gap-10">
     <div className="flex-1 rounded-md border p-5">
      {cart?.lineItems?.map((item) => <CartItem key={item._id} item={item} />)}
     </div>
     <div className="sticky top-20 mb-auto w-96 rounded-md border p-5">
      <h2 className="text-lg font-medium">Summary</h2>
     </div>
    </div>
   </div>
  </main>
 );
};

function CartItem({ item }: { item: LineItem }) {
 const image = media.getScaledToFillImageUrl(item.image!, 600, 600, {});
 return (
  <div>
   <div className="relative h-56 w-44 rounded-md">
    <Image
     src={image}
     alt={item.productName?.original!}
     fill
     className="object-cover object-center"
    />
   </div>
  </div>
 );
}

export default ViewCartPage;
