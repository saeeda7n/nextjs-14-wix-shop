"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { cn } from "@/libs/utils";
import { products } from "@wix/stores";

type Props = {
 media: Pick<products.Product, "media">["media"];
};

export function ProductImages({ media }: Props) {
 const [image, setImage] = useState(media?.mainMedia?.image?.url || "");
 const [loading, setLoading] = useState(false);
 useEffect(() => {
  setLoading(true);
 }, [image]);
 return (
  <div className="flex flex-col gap-4 lg:gap-5">
   <div className="relative aspect-square  max-h-[36rem] overflow-hidden rounded-md bg-gray-100">
    <Image
     onLoadingComplete={() => setLoading(false)}
     src={image}
     alt={media?.mainMedia?.image?.altText || ""}
     width={1024}
     height={1024}
     className="h-full w-full object-cover object-center"
     draggable={false}
    />

    <div
     className={cn(
      "absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 backdrop-blur transition duration-300",
      { "opacity-100": loading },
     )}
    >
     <Loader className="animate-spin" />
    </div>
   </div>
   <div className="grid grid-cols-4 gap-3 lg:gap-5">
    {media?.items?.slice(0, 4).map((media) => (
     <div
      onClick={() => setImage(media.image?.url || "")}
      role={"button"}
      className="aspect-square overflow-hidden rounded-md bg-gray-100"
      key={media._id}
     >
      <Image
       src={media.image?.url || ""}
       alt={media.image?.altText || ""}
       width={500}
       height={500}
       draggable={false}
       className="h-full w-full object-cover object-center"
      />
     </div>
    ))}
   </div>
  </div>
 );
}
