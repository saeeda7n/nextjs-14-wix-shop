import React from "react";
import Link from "next/link";
import Menu from "@/components/navbar/menu";
import Image from "next/image";
import SearchBar from "@/components/navbar/searchBar";
import NavIcons from "@/components/navbar/navIcons";

const Navbar = () => {
 return (
  <nav className="relative z-50 h-20 shadow-sm">
   <div className="container flex h-full items-center">
    <Link href="/" className="flex items-center gap-2 text-2xl tracking-wide">
     <Image
      className="size-10 max-md:hidden"
      src="/assets/images/logo.png?1"
      alt="Site logo"
      width={120}
      height={50}
     />
     Shop
    </Link>
    <div className="ms-auto flex items-center gap-5">
     <SearchBar />
     <NavIcons />
     <Menu />
    </div>
   </div>
  </nav>
 );
};

export default Navbar;
