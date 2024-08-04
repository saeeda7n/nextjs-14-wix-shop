import { cn } from "@/libs/utils";
import React from "react";

export const ProductListFallback = ({ items }: { items?: number }) => {
 const classes = ["w-20", "w-12", "w-16"];

 return (
  <div className="grid animate-pulse grid-cols-1 gap-5 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
   {[...new Array(items || 4)].map((_, index) => (
    <div className="flex w-full flex-col gap-4" key={index}>
     <div className="group relative h-80 w-full overflow-hidden rounded-md bg-gray-200"></div>
     <div className="flex flex-1 flex-col">
      <div className="flex items-center justify-between">
       <div className="h-5 w-24 rounded-md bg-gray-200" />
       <div className="h-5 w-8 rounded-md bg-gray-200" />
      </div>
      <div className="mt-4 flex flex-wrap gap-1">
       {[...new Array(5)].map((_, index) => (
        <div
         key={index}
         className={cn(
          "h-4 w-32 rounded-md bg-gray-200",
          classes[~~(Math.random() * classes.length)],
         )}
        />
       ))}
      </div>
      <div className="line-clamp-2 text-sm text-gray-500" />
      <div className="mt-3 h-7 w-32 self-start rounded-xl bg-gray-200"></div>
     </div>
    </div>
   ))}
  </div>
 );
};
