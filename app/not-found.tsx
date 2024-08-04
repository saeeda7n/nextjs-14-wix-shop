import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MoveLeftIcon } from "lucide-react";
import { getWixClient } from "@/libs/getWixClient";
import { Metadata } from "next";

export const metadata: Metadata = {
 title: "404 Page not found!",
};
const NotFound = async () => {
 const wix = getWixClient();
 const { items: categories } = await wix.collections.queryCollections().find();

 return (
  <main className="flex min-h-screen py-16">
   <div className="container relative flex flex-1 gap-10 gap-y-16 max-lg:max-w-xl max-lg:flex-col">
    <Link
     href={"/"}
     className="absolute z-50 flex items-center gap-2 font-medium opacity-50"
    >
     <MoveLeftIcon />
     Back to Shop
    </Link>
    <div className="relative flex min-h-96 flex-1">
     <Image
      src="/assets/images/illustrations/undraw_page_not_found_re_e9o6.svg"
      alt={"404"}
      fill
     />
    </div>
    <div className="flex flex-1 flex-col justify-center gap-8">
     <div className="flex items-center gap-2">
      <h2 className="text-7xl font-black">Woops</h2>
      <div className="flex">
       <span className="block origin-bottom rotate-12 text-7xl font-black text-gray-700">
        !
       </span>
       <span className="origin-bottom rotate-[22.5deg] text-7xl font-black text-gray-600">
        !
       </span>
       <span className="origin-bottom -translate-x-1 rotate-45 text-7xl font-black text-gray-500">
        !
       </span>
      </div>
     </div>
     <div className="max-w-lg">
      <p className="text-lg">
       Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci
       aperiam fuga iste nesciunt provident qui quia, quo quod. Accusantium
       adipisci autem deleniti incidunt inventore laborum libero mollitia quod
       veniam vitae?
      </p>
      <h2 className="mt-5 text-xl font-medium">
       Or use one of these collections
      </h2>
      <div className="mt-2 flex flex-wrap gap-2">
       {categories.map((category) => (
        <Link
         href={`/products?category=${category.slug}`}
         key={category._id}
         className="rounded-md bg-gray-200 px-2 py-1 text-sm font-medium transition hover:bg-gray-100"
        >
         {category.name}
        </Link>
       ))}
      </div>
     </div>
    </div>
   </div>
  </main>
 );
};

export default NotFound;
