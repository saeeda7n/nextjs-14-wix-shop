"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React from "react";
import { cn } from "@/libs/utils";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
 totalPages: number;
 hasNext: boolean;
 hasPrev: boolean;
 currentPage: number;
};

export function Pagination({
 hasNext,
 hasPrev,
 totalPages,
 currentPage,
}: Props) {
 const searchParams = useSearchParams();
 const pathname = usePathname();

 function createURL(page: number): URL {
  const params = new URLSearchParams(searchParams);
  params.set("page", String(page));
  return `${pathname}?${params.toString()}` as any;
 }

 return (
  <div className="mt-12 flex items-center justify-center">
   <nav
    className="isolate inline-flex -space-x-px rounded-md shadow-sm"
    aria-label="Pagination"
   >
    <Link
     prefetch={false}
     href={createURL(currentPage - 1)}
     className={cn(
      "relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0",
      { "pointer-events-none opacity-50": !hasPrev },
     )}
    >
     <span className="sr-only">Previous</span>
     <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
    </Link>
    {[...new Array(totalPages)].map((_, index) => (
     <Link
      key={index}
      href={createURL(index + 1)}
      prefetch={false}
      aria-current="page"
      className={cn(
       "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:text-gray-900 focus:z-20 focus:outline-offset-0",
       {
        "pointer-events-none bg-emerald-500 text-gray-50 hover:bg-emerald-600 hover:text-gray-50":
         currentPage === index,
       },
      )}
     >
      {index + 1}
     </Link>
    ))}

    <Link
     prefetch={false}
     href={createURL(currentPage + 1)}
     className={cn(
      "relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0",
      { "pointer-events-none opacity-50": !hasNext },
     )}
    >
     <span className="sr-only">Next</span>
     <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
    </Link>
   </nav>
  </div>
 );
}
