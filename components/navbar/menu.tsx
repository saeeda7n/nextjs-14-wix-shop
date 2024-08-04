"use client";
import React, { useState } from "react";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

const Menu = () => {
 const [open, setOpen] = useState(false);
 return (
  <div className="md:hidden">
   <MenuIcon role="button" onClick={() => setOpen((state) => !state)} />
   {open && (
    <div className="absolute left-0 top-full z-50 flex h-[calc(100vh-theme(spacing.20))] w-full flex-col items-center justify-center gap-5 bg-black text-lg text-gray-50">
     <Link href={"/"}>Home</Link>
     <Link href={"/"}>Shop</Link>
     <Link href={"/"}>About</Link>
     <Link href={"/"}>Contact</Link>
     <Link href={"/"}>Cart</Link>
    </div>
   )}
  </div>
 );
};

export default Menu;
