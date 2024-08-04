import React, { PropsWithChildren } from "react";
import Image from "next/image";
function SpecialOffer() {
 return (
  <div className="relative hidden min-h-80 overflow-hidden rounded-lg bg-pink-100 sm:flex">
   <div className="z-10 flex w-2/3 flex-col items-center justify-center gap-10 px-6 text-center xl:px-16">
    <h2 className="text-5xl font-bold text-gray-700 lg:text-6xl">
     Grab up to 50% off on Selected Products
    </h2>
    <button className="flex h-10 items-center justify-center rounded-md bg-pink-500 px-6 font-semibold text-gray-50">
     Buy now
    </button>
   </div>
   <div className="absolute -right-32 md:-right-16 lg:right-0">
    <Image
     width={500}
     height={500}
     src={"/assets/images/woman.png"}
     alt="Woman"
     draggable={false}
     className="max-h-80 object-contain object-center"
    />
   </div>
  </div>
 );
}
const ProductListLayout = ({ children }: PropsWithChildren) => {
 return (
  <main className="space-y-16 pt-10">
   <section className="container">
    <SpecialOffer />
   </section>
   {children}
  </main>
 );
};

export default ProductListLayout;
