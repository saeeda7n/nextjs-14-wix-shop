import { products } from "@wix/stores";
import { ProductCustomization } from "@/app/(root)/products/[slug]/productCustomization";
import React from "react";

const notAllowed = ["shortDesc"];

export function ProductContent({ product }: { product: products.Product }) {
 const additionalInfoSections = product.additionalInfoSections?.filter(
  ({ title }) => !notAllowed.includes(title || ""),
 );
 return (
  <div className="space-y-6">
   <h1 className="text-3xl font-semibold">{product.name}</h1>
   <p className="text-gray-600">{product.description}</p>

   <div className="flex items-center gap-2 border-b border-t py-4">
    {product.discount?.value !== 0 && (
     <h3 className="text-lg font-semibold line-through opacity-60">
      {product.price?.formatted?.price}
     </h3>
    )}
    <h2 className="text-2xl font-bold">
     {product.price?.formatted?.discountedPrice}
    </h2>
   </div>

   <div>
    <ProductCustomization
     productId={product._id!}
     variants={product.variants}
     productOptions={product.productOptions}
    />
   </div>

   <div className="space-y-6 border-t pt-4">
    {additionalInfoSections?.map((value) => (
     <div className="space-y-1" key={value.title}>
      <h4 className="font-semibold">{value.title}</h4>
      <p className="text-gray-700">{value.description}</p>
     </div>
    ))}
   </div>
  </div>
 );
}
