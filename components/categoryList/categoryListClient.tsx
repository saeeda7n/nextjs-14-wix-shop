"use client";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/libs/gsap";
import { useGesture } from "@use-gesture/react";
import Image from "next/image";
import Link from "next/link";
import { Collection } from "@wix/stores_collections";

function CategoryCard({ category }: { category: Collection }) {
 return (
  <div draggable={false} className="flex-shrink-0">
   <Image
    loading="eager"
    draggable={false}
    width={512}
    height={512}
    src={category.media?.mainMedia?.image?.url || ""}
    alt={category.name || ""}
    className="h-72 w-60 bg-gray-100 object-cover object-center md:h-80 md:w-72"
   />
   <Link href={`/products?category=${category.slug}`}>
    <h1 className="mt-2.5 text-lg tracking-wider md:mt-5">{category.name}</h1>
   </Link>
  </div>
 );
}

type Props = {
 categories: Collection[];
};

export function CategoryListClient({ categories }: Props) {
 const target = useRef<HTMLDivElement>(null);
 const { contextSafe } = useGSAP();

 const scroll = contextSafe((x: number) => {
  gsap.to(target.current, {
   scrollLeft: x,
   ease: "power3.out",
  });
 });
 useGesture(
  {
   onDrag: ({ delta: [x] }) => {
    if (target.current) target.current.scrollLeft += -x;
   },
   onDragEnd: ({ velocity: [x], direction: [dX] }) => {
    if (!target.current) return;
    scroll(target.current.scrollLeft + x * 50 * dX * -1);
   },
   // onWheel: ({ delta: [, y], event, direction: [, dY] }) => {
   //  // event.preventDefault();
   //  // if (target.current) {
   //  //  scroll(target.current.scrollLeft + y * 5);
   //  // }
   // },
  },

  { target, eventOptions: { passive: false } },
 );

 return (
  <div
   className="hidden-scrollbar mx-auto w-full max-w-[2380px] select-none overflow-x-scroll px-4"
   ref={target}
  >
   <div className="flex w-max gap-5">
    {categories.map((category) => (
     <CategoryCard category={category} key={category._id} />
    ))}
   </div>
  </div>
 );
}
