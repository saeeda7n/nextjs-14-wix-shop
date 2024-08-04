import React from "react";
import { CartPopover } from "@/components/navbar/cartPopover";
import { ProfilePopover } from "@/components/navbar/profilePopover";

const NavIcons = () => {
 return (
  <div className="relative z-50 flex gap-3">
   <ProfilePopover />
   <CartPopover />
  </div>
 );
};

export default NavIcons;
