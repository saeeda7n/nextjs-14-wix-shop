"use client";
import {
 Popover,
 PopoverButton,
 PopoverPanel,
 Transition,
} from "@headlessui/react";
import { Loader, LogOutIcon, UserIcon } from "lucide-react";
import React from "react";
import { useWix } from "@/hooks/useWix";
import Link from "next/link";
import { logout, setVisitor } from "@/server/actions/auth";
import { useCartStore } from "@/stores/useCartStore";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

export function ProfilePopover() {
 const clearStore = useCartStore((state) => state.clearStore);
 const wix = useWix();
 const { isLoading, data: profile } = useQuery({
  queryFn: async () => wix.members.getCurrentMember(),
  queryKey: ["user", wix.auth.getTokens().accessToken, wix.auth.loggedIn()],
  enabled: wix.auth.loggedIn(),
 });

 async function logoutCurrentUser() {
  await logout();
  await wix.auth.logout("");
  process.nextTick(async () => {
   if (wix.auth.getTokens().refreshToken.value)
    await setVisitor(wix.auth.getTokens());
  });
  clearStore();
 }

 if (!wix.auth.loggedIn())
  return (
   <Link href={"/auth/login"}>
    <UserIcon />
   </Link>
  );
 return (
  <Popover>
   <PopoverButton className="focus:outline-none">
    <UserIcon />
   </PopoverButton>
   <Transition
    enter="transition ease-out duration-200"
    enterFrom="opacity-0 translate-y-1"
    enterTo="opacity-100 translate-y-0"
    leave="transition ease-in duration-150"
    leaveFrom="opacity-100 translate-y-0"
    leaveTo="opacity-0 translate-y-1"
   >
    <PopoverPanel
     anchor="bottom end"
     className="z-50 rounded-xl border bg-white text-sm/6 text-gray-950"
    >
     {isLoading ? (
      <LoadingProfile />
     ) : (
      <div className="flex w-72 gap-2 overflow-hidden p-3">
       <img
        className="size-14 self-center rounded-md"
        src={`https://api.dicebear.com/9.x/fun-emoji/svg?seed=${profile?.member?.profile?.slug}`}
        alt={profile?.member?.profile?.slug || "Profile"}
       />
       <div className="flex flex-1 flex-col justify-center">
        <h2 className="line-clamp-2 text-lg/6 font-medium">
         {profile?.member?.profile?.nickname || "User"}
        </h2>
        <span className="text-sm font-medium text-gray-700">
         @{profile?.member?.profile?.slug || "--"}
        </span>
       </div>
       <button
        onClick={logoutCurrentUser}
        className="ml-auto flex items-center justify-center rounded-md bg-zinc-950 px-2 py-1 text-xs text-gray-50 transition hover:bg-zinc-900"
       >
        <p className="flex items-center gap-2">
         <LogOutIcon size={12} />
        </p>
       </button>
      </div>
     )}
    </PopoverPanel>
   </Transition>
  </Popover>
 );
}

function LoadingProfile() {
 return (
  <div className="flex min-h-44 min-w-72 items-center justify-center">
   <Loader className="animate-spin" />
  </div>
 );
}
