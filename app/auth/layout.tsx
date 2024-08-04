import React, { PropsWithChildren } from "react";
import Image from "next/image";
import { getWixClient } from "@/libs/getWixClient";

const AuthLayout = async ({ children }: PropsWithChildren) => {
 return (
  <main className="relative flex min-h-screen overflow-hidden duration-300 [transition-property:padding] xl:p-16 2xl:p-[5vw]">
   <Image
    src="https://cdn.dribbble.com/users/1731254/screenshots/14526594/media/0ccc2937f211d543f04b5996af8f7403.png"
    alt={"Shopping"}
    fill
    draggable={false}
    className="absolute inset-0 z-10 object-cover object-center"
   />
   <div className="absolute inset-0 z-20 bg-white/10 backdrop-blur-xl" />
   <div className="relative z-50 flex flex-1 flex-row-reverse overflow-hidden bg-white shadow-xl xl:rounded-[0.35vw]">
    <div className="relative hidden flex-1 select-none overflow-hidden border-[max(4px,0.4vw)] border-white md:flex">
     <Image
      draggable={false}
      src="https://cdn.dribbble.com/users/1731254/screenshots/14526594/media/0ccc2937f211d543f04b5996af8f7403.png"
      alt={"Shopping"}
      fill
      className="absolute inset-0 rounded-sm bg-gray-100 object-cover object-center xl:rounded-[0.25vw]"
     />
     {/*<div className="relative flex-1">Any Content</div>*/}
    </div>
    <div className="flex min-h-96 w-full min-w-96 md:w-1/4">
     <div className="mx-auto flex max-w-96 flex-1">{children}</div>
    </div>
   </div>
  </main>
 );
};

export default AuthLayout;
