import React from "react";
import { ProductListFallback } from "@/components/productListFallback";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Loading = () => {
 return (
  <div className="min-h-screen space-y-32">
   <div className="flex h-[calc(100svh-theme(spacing.20))] min-h-[35rem] items-center justify-center bg-gray-200">
    <Loader className="animate-spin" />
   </div>
   <div className="container space-y-5">
    <div className="h-8 w-44 rounded-md bg-gray-200" />
    <ProductListFallback />
   </div>

   <div className="space-y-5">
    <div className="container">
     <div className="h-8 w-44 rounded-md bg-gray-200" />
    </div>
    <div className="hidden-scrollbar mx-auto w-full max-w-[2380px] animate-pulse select-none overflow-x-scroll px-4">
     <div className="flex w-max gap-5">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((category) => (
       <div draggable={false} className="flex-shrink-0" key={category}>
        <div className="h-72 w-60 bg-gray-200 md:h-80 md:w-72" />
        <div className="mt-2.5 text-lg tracking-wider md:mt-5" />
       </div>
      ))}
     </div>
    </div>
   </div>

   <div className="container space-y-5">
    <div className="h-8 w-44 rounded-md bg-gray-200" />
    <ProductListFallback />
   </div>
  </div>
 );
};

export default Loading;
