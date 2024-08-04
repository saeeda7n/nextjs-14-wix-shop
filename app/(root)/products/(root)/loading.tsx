import React from "react";
import { ProductListFallback } from "@/components/productListFallback";

const Loading = () => {
 return (
  <div className="container flex flex-col gap-16 ">
   <div className="flex animate-pulse gap-5">
    <div className="h-9 w-32 rounded-md bg-gray-200" />
    <div className="h-9 w-32 rounded-md bg-gray-200" />
    <div className="h-9 w-32 rounded-md bg-gray-200" />
    <div className="ml-auto h-9 w-16 rounded-md bg-gray-200" />
   </div>
   <div className="space-y-6">
    <div className="h-7 w-36 rounded-md bg-gray-200" />
    <ProductListFallback items={8} />
   </div>
  </div>
 );
};

export default Loading;
