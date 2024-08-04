import React, { PropsWithChildren } from "react";
import { getWixClient } from "@/libs/getWixClient";
import { Cart, EstimateTotalsResponse, LineItem } from "@wix/ecom_current-cart";
import { media } from "@wix/sdk";
import Image from "next/image";
import { ShoppingBasketIcon } from "lucide-react";
import Link from "next/link";
import { SummaryFooter } from "@/app/(root)/cart/summaryFooter";
import { RemoveItemFromCartButton } from "@/app/(root)/cart/removeItemFromCartButton";

function CartItems({ cart }: { cart: Cart }) {
 return (
  <div className="mb-auto flex-1 space-y-5 rounded-md border p-5">
   {cart?.lineItems?.map((item) => <CartItem key={item._id} item={item} />)}
  </div>
 );
}

const ViewCartPage = async () => {
 const wix = getWixClient();
 let cart: Cart | null;
 let estimatedTotals: EstimateTotalsResponse | null;
 try {
  cart = await wix.currentCart.getCurrentCart();
  estimatedTotals = await wix.currentCart.estimateCurrentCartTotals();
 } catch (e) {
  cart = null;
  estimatedTotals = null;
 }
 if (!cart || (cart.lineItems?.length || 0) <= 0 || !estimatedTotals)
  return (
   <main className="min-h-[calc(100vh-32.1rem)] pt-10">
    <div className="container flex flex-col items-center justify-center gap-8">
     <Image
      className="max-w-lg"
      src={"/assets/images/illustrations/undraw_empty_cart_co35.svg"}
      alt={"Empty cart"}
      width={1400}
      height={960}
     />
     <h4 className="text-xl font-medium">
      Your cart is empty,
      <Link href="/" className="ms-1 text-teal-600">
       Back to shopping
      </Link>
      .
     </h4>
    </div>
   </main>
  );
 return (
  <main className="min-h-[calc(100vh-32.1rem)] pt-10">
   <div className="space-y-5">
    <h1 className="container text-2xl font-semibold">Your Cart</h1>
    <div className="container flex flex-col gap-5 lg:flex-row xl:gap-10">
     <CartItems cart={cart} />
     <SummaryCard cart={cart} estimatedTotals={estimatedTotals} />
    </div>
   </div>
  </main>
 );
};

function DiscountCard({
 estimatedTotals,
}: {
 estimatedTotals: EstimateTotalsResponse;
}) {
 if ((estimatedTotals.appliedDiscounts?.length || 0) <= 0) return null;
 return (
  <div className="mt-5 rounded-lg border-2 border-teal-600 bg-teal-100 p-5 text-sm">
   <h3 className="text-base font-medium">Applied Coupon</h3>
   <ul className="mt-3 space-y-2">
    {estimatedTotals.appliedDiscounts?.map((coupon) => (
     <li className="flex items-center justify-between">
      <span className="text-gray-500">{(coupon.coupon as any).couponType}</span>
      <span>{coupon.coupon?.name}</span>
     </li>
    ))}
    <li className="flex items-center justify-between">
     <span className="text-gray-500">Discount</span>
     <span>{estimatedTotals.priceSummary?.discount?.formattedAmount}</span>
    </li>
   </ul>
  </div>
 );
}

function SummaryCard({
 cart,
 estimatedTotals,
}: {
 cart: Cart;
 estimatedTotals: EstimateTotalsResponse;
}) {
 const totalItems = cart.lineItems?.reduce(
  (acc, { quantity }) => acc + quantity!,
  0,
 );

 const items = [
  {
   key: "Total items",
   value: `${totalItems} Items`,
  },
  {
   key: "Subtotal",
   value: estimatedTotals.priceSummary?.total?.formattedAmount,
  },
  {
   key: "Discount",
   value: estimatedTotals.priceSummary?.discount?.formattedAmount,
  },
  {
   key: "Shipping",
   value: estimatedTotals.priceSummary?.shipping?.formattedAmount,
  },
  {
   key: "Tax",
   value: estimatedTotals.priceSummary?.tax?.formattedAmount,
  },
 ];

 return (
  <div className="top-12 mb-auto w-full rounded-md border p-5 lg:sticky lg:w-96">
   <h2 className="text-xl font-medium">Summary</h2>
   <div className="mt-5 text-sm">
    <ul className="space-y-2">
     {items.map(({ key, value }) => (
      <li className="flex items-center justify-between" key={key}>
       <span className="text-gray-500">{key}</span>
       <span>{value}</span>
      </li>
     ))}
    </ul>
   </div>

   <DiscountCard estimatedTotals={estimatedTotals} />
   <SummaryFooter estimatedTotals={estimatedTotals} />
  </div>
 );
}

function CartItem({ item }: { item: LineItem }) {
 const image = media.getScaledToFillImageUrl(item.image!, 600, 600, {});
 const slug = item.url?.split("/").at(-1);
 return (
  <div className="flex gap-5">
   <div className="relative size-40 overflow-hidden rounded-lg bg-gray-100 md:size-44">
    <Image
     src={image}
     alt={item.productName?.original!}
     fill
     className="object-cover object-center"
    />
   </div>
   <div className="flex flex-1 flex-col justify-center">
    <h3 className="mt-auto text-xl font-medium">
     <Link href={`/products/${slug}`}>{item.productName?.original}</Link>
    </h3>
    <p className="text-gray-500">{item.availability?.status}</p>

    <div className="mt-auto flex gap-3">
     <Chip>
      <ShoppingBasketIcon className="size-4" />
      {item.quantity}
     </Chip>
     <Chip>
      <ShoppingBasketIcon className="size-4" />
      {item.price?.formattedAmount}
     </Chip>
    </div>
   </div>
   <div className="flex items-center justify-center">
    <RemoveItemFromCartButton id={item._id as string} />
   </div>
  </div>
 );

 function Chip({ children }: PropsWithChildren) {
  return (
   <div className="flex items-center gap-1 rounded-md bg-gray-100 px-2 py-0.5 text-sm font-medium text-gray-700">
    {children}
   </div>
  );
 }
}

export default ViewCartPage;
