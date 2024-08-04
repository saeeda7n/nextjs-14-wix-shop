import React from "react";
import { cn } from "@/libs/utils";

const classes = ["w-36", "w-32", "w-20", "w-24", "w-12", "w-16", "w-44"];
const Loading = () => {
 return (
  <div className="container flex flex-col gap-10 pb-16 pt-10 lg:flex-row">
   <div className="top-20 h-max w-full lg:sticky lg:w-1/2">
    <div className="flex flex-col gap-4 lg:gap-5">
     <div className="relative h-96 animate-pulse overflow-hidden rounded-md bg-gray-200 md:h-[32rem]" />
     <div className="grid grid-cols-4 gap-3 lg:gap-5">
      {[1, 2, 3, 4].map((_, index) => (
       <div
        className="aspect-square w-full animate-pulse overflow-hidden rounded-md bg-gray-200"
        key={index}
       />
      ))}
     </div>
    </div>
   </div>
   <div className="w-full lg:w-1/2">
    <div className="space-y-6">
     <div className="h-8 max-w-72 animate-pulse rounded-md bg-gray-200" />
     <div className="flex animate-pulse flex-wrap gap-1 delay-75">
      {[...new Array(32)].map((_, index) => (
       <div
        key={index}
        className={cn(
         "h-4 w-32 rounded-md bg-gray-200",
         classes[~~(Math.random() * classes.length)],
        )}
       />
      ))}
     </div>

     <div className="flex items-center gap-2 border-b border-t py-4">
      <div className="h-8 w-24 animate-pulse rounded-md bg-gray-200 delay-100" />
     </div>

     <div className="space-y-6">
      {[1, 2, 3].map((value) => (
       <div className="space-y-2" key={value}>
        <div className="h-5 w-44 rounded-md bg-gray-200" key={value} />
        <div className="flex animate-pulse flex-wrap gap-1 delay-75">
         {[...new Array(16)].map((_, index) => (
          <div
           key={index}
           className={cn(
            "h-4 w-32 rounded-md bg-gray-200",
            classes[~~(Math.random() * classes.length)],
           )}
          />
         ))}
        </div>
       </div>
      ))}
     </div>
    </div>
   </div>
  </div>
 );
};

export default Loading;
