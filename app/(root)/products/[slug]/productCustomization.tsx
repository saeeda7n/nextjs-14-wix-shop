"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ColorSelection } from "@/components/colorSelection";
import { OptionButton } from "@/components/optionButton";
import { NumberSelector } from "@/components/numberSelector";
import { Loader, ShoppingBasket } from "lucide-react";
import { products } from "@wix/stores";
import { useCartStore } from "@/stores/useCartStore";
import { useWix } from "@/hooks/useWix";

enum ProductOptionTypes {
 COLOR = "Color",
 SIZE = "Size",
}

type Props = {
 productId: string;
 variants: products.Product["variants"];
 productOptions: products.Product["productOptions"];
};

type AddToCartProps = {
 productId: string;
 quantity: number;
 variantId: string;
};

function AddToCart({ productId, quantity, variantId }: AddToCartProps) {
 const wixClient = useWix();
 const addToCart = useCartStore((state) => state.addItem);
 const loading = useCartStore((state) => state.isLoading);

 return (
  <button
   disabled={loading}
   onClick={() => addToCart(wixClient, { productId, quantity, variantId })}
   className="flex h-12 items-center justify-center gap-2 rounded-lg border border-emerald-500 px-6 text-emerald-500 disabled:opacity-50"
  >
   {loading ? <Loader className="animate-spin" /> : <ShoppingBasket />}
   Add to cart
  </button>
 );
}

export function ProductCustomization({
 variants,
 productOptions,
 productId,
}: Props) {
 const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: any }>(
  () => {
   const defaults = new Map<string, any>();
   productOptions?.map(({ name, choices }) =>
    defaults.set(name!, choices?.at(0)!.description),
   );
   return Object.fromEntries(defaults);
  },
 );
 const [quantity, setQuantity] = useState(1);

 const variant = useMemo(() => {
  return variants?.find((variant) => {
   if (!variant.choices) return false;
   return Object.entries(variant?.choices).every(
    ([key, value]) => selectedOptions[key] === value,
   );
  })!;
 }, [selectedOptions]);

 function handleChangeState(type: ProductOptionTypes, value: any) {
  setSelectedOptions((prev: any) => ({ ...prev, [type]: value }));
 }

 const isInStock = (choices: { [key: string]: string }) => {
  return variants?.some((variant) => {
   const variantChoices = variant.choices;
   if (!variantChoices) return false;

   return (
    Object.entries(choices).every(
     ([key, value]) => variantChoices[key] === value,
    ) && variant.stock?.inStock
   );
  });
 };
 console.log(variant);

 const maxQuantity = variant.stock?.quantity
  ? variant.stock?.quantity
  : variant?.stock?.inStock
    ? 50
    : 0;

 return (
  <div className="flex flex-col gap-5">
   {productOptions?.map(({ name, choices }) => {
    return (
     <div key={name} className="space-y-2">
      <h4 className="font-medium">{name}s</h4>
      <ul className="flex items-center gap-2">
       {choices?.map(({ value, description }) => {
        const inStock = isInStock({
         ...selectedOptions,
         [name!]: description,
        });
        switch (name) {
         case ProductOptionTypes.SIZE:
          return (
           <li key={value}>
            <OptionButton
             disabled={!inStock}
             active={selectedOptions[name] === description}
             onClick={() =>
              handleChangeState(name as ProductOptionTypes, description)
             }
            >
             {description}
            </OptionButton>
           </li>
          );
         case ProductOptionTypes.COLOR:
          return (
           <li key={value}>
            <ColorSelection
             disabled={!inStock}
             active={selectedOptions[name] === description}
             onClick={() =>
              handleChangeState(name as ProductOptionTypes, description)
             }
             color={value as string}
            />
           </li>
          );
        }
       })}
      </ul>
     </div>
    );
   })}

   <div className="space-y-2">
    <h4 className="font-medium">Choose a Quantity</h4>
    <div className="flex flex-wrap items-center justify-between gap-y-5">
     <div className="flex items-center gap-3">
      <NumberSelector
       onChange={setQuantity}
       max={maxQuantity}
       defaultValue={1}
      />
      {!variant.stock?.inStock && variant.stock!.quantity! < 10 && (
       <span className="max-w-36 text-sm font-medium">
        Only{" "}
        <span className="text-emerald-500">
         {variant.stock!.quantity!} items
        </span>
        left! Dont miss it!
       </span>
      )}
     </div>
     <AddToCart
      variantId={variant._id!}
      quantity={quantity}
      productId={productId}
     />
    </div>
   </div>
  </div>
 );
}
