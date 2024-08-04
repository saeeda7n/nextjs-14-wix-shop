"use client";
import { EstimateTotalsResponse } from "@wix/ecom_current-cart";
import React, { useState } from "react";
import { toast } from "sonner";
import {
 applyCoupon,
 removeCouponFromCurrentCart,
} from "@/server/actions/cart";
import { useMutation } from "@tanstack/react-query";
import { LoaderIcon } from "lucide-react";

function CouponDialog({
 onClose,
 show,
}: {
 show: boolean;
 onClose: () => void;
}) {
 const [code, setCode] = useState("");
 const { mutate, isPending } = useMutation({
  mutationFn: (variables: string) => applyCoupon(variables),
  onSettled: (data, error) => {
   onClose();
   if (error) {
    toast("Some error happened while applying discount code!");
   } else {
    toast("Discount code applied.");
   }
  },
 });
 if (!show) return null;

 return (
  <div
   className="fixed inset-0 flex items-center justify-center bg-gray-100/50 backdrop-blur"
   onClick={() => onClose()}
  >
   <style>{`html{overflow:hidden;}`}</style>
   <div
    className="min-h-16 w-96 rounded-lg border-2 bg-gray-50 p-5"
    onClick={(e) => e.stopPropagation()}
   >
    <h2 className="text-xl font-medium">Coupon Code</h2>
    <p className="text-sm text-gray-500">
     There is only 1 discount available and it is "DEMO", it will apply on all
     products.
    </p>
    <div className="mt-5 space-y-2">
     <input
      type="text"
      onChange={(e) => setCode(e.target.value)}
      className="w-full rounded-lg border bg-gray-100 px-3 py-2"
      placeholder="Coupon Code ..."
     />

     <div className="flex justify-between gap-2">
      <button
       onClick={() => onClose()}
       className="flex h-8 items-center justify-center rounded-lg px-5 text-sm text-red-600"
      >
       Close
      </button>
      <button
       disabled={isPending}
       onClick={() => mutate(code)}
       className="flex h-8 items-center justify-center gap-1 rounded-lg bg-black px-5 text-sm text-gray-50"
      >
       {isPending && <LoaderIcon className="size-4 animate-spin" />}
       Apply Coupon
      </button>
     </div>
    </div>
   </div>
  </div>
 );
}

export function SummaryFooter({
 estimatedTotals,
}: {
 estimatedTotals: EstimateTotalsResponse;
}) {
 const { mutate, isPending } = useMutation({
  mutationFn: removeCouponFromCurrentCart,
  onSettled: (data, error) => {
   if (error) {
    toast("Some error happened while deleting discount code!");
   } else {
    toast("Discount code deleted.");
   }
  },
 });
 const [applyDiscount, setApplyDiscount] = useState(false);
 return (
  <div className="relative mt-16 flex gap-5">
   {(estimatedTotals.appliedDiscounts?.length || 0) > 0 ? (
    <button
     onClick={() => mutate()}
     className="flex h-10 items-center justify-center gap-1 rounded-lg border border-red-600 px-5 font-medium text-red-600"
    >
     {isPending && <LoaderIcon className="size-5 animate-spin" />}
     Remove Coupon
    </button>
   ) : (
    <button
     onClick={() => setApplyDiscount(true)}
     className="flex h-10 items-center justify-center rounded-lg border px-5 font-medium"
    >
     Apply Coupon
    </button>
   )}

   <button
    onClick={() =>
     toast("This feature is not available.", {
      description: "Payment and check out are limited for wix free plan.",
      id: "wix_free_plan",
     })
    }
    className="flex h-10 flex-1 items-center justify-center rounded-lg bg-black px-5 font-medium text-gray-50"
   >
    Check out
   </button>

   <CouponDialog show={applyDiscount} onClose={() => setApplyDiscount(false)} />
  </div>
 );
}
