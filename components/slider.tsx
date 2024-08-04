"use client";
import React, { useEffect, useRef, useState } from "react";
import slides from "@/data/slider.json" assert { type: "json" };
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { cn } from "@/libs/utils";
import { slideAnimation } from "@/components/animations";

const Slider = () => {
 const scope = useRef(null);
 const [currentSlide, setCurrentSlide] = useState(0);
 const [previousSlide, setPreviousSlide] = useState(0);
 const [first, setFirst] = useState(true);
 useGSAP(
  () => {
   if (first) return;
   slideAnimation(currentSlide, previousSlide);
  },
  { scope, dependencies: [currentSlide] },
 );

 useEffect(() => {
  setFirst(false);
  const clear = setTimeout(() => {
   setPreviousSlide(currentSlide);
   setCurrentSlide((currentSlide + 1) % slides.length);
  }, 8000);

  return () => clearTimeout(clear);
 }, [currentSlide]);

 return (
  <div
   ref={scope}
   className="relative z-10 h-[calc(100svh-theme(spacing.20))] min-h-[35rem] overflow-hidden"
  >
   <div className="flex h-full w-max">
    {slides.map((slide) => (
     <Slide key={slide.id} slide={slide} />
    ))}
   </div>
   <SliderNavigator
    slides={slides.length}
    activeIndex={currentSlide}
    onChange={(index) => {
     if (index === currentSlide) return;
     setCurrentSlide(index);
     setPreviousSlide(currentSlide);
    }}
   />
  </div>
 );
};

function Slide({ slide }: { slide: (typeof slides)[0] }) {
 return (
  <div className="slide relative z-auto flex w-screen flex-col lg:flex-row">
   <div
    className={cn(
     "relative z-10 flex flex-1 flex-col items-center justify-center gap-8 bg-gray-100/70 px-16 py-16 lg:w-1/2",
     slide.className,
    )}
   >
    <h2 className="text-center text-4xl md:text-6xl">{slide.description}</h2>
    <h1 className="text-center text-6xl font-bold lg:text-7xl">
     {slide.title}
    </h1>
    <Link
     href={slide.url as any}
     className="mt-16 flex h-10 items-center justify-center rounded-md border border-zinc-950 bg-zinc-950 px-6 text-sm font-bold uppercase text-gray-50 transition hover:bg-transparent hover:text-zinc-950 lg:h-12 lg:px-8 lg:text-base"
    >
     Shop Now
    </Link>
   </div>
   <div className="absolute inset-0 lg:relative lg:w-1/2">
    <Image
     src={slide.image}
     className="object-cover object-center"
     fill
     alt={slide.title}
    />
   </div>
  </div>
 );
}

type SliderNavigatorProps = {
 onChange: (index: number) => void;
 activeIndex: number;
 slides: number;
};

function SliderNavigator({
 slides,
 onChange,
 activeIndex,
}: SliderNavigatorProps) {
 return (
  <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 flex h-20 items-center justify-center">
   <div className="pointer-events-auto flex gap-2">
    {[...new Array(slides)].map((_, index) => (
     <button
      onClick={() => onChange(index)}
      className={cn(
       "size-4 rounded-full border-2 border-zinc-950 transition hover:bg-zinc-950",
       { "bg-zinc-950": activeIndex === index },
      )}
      key={index}
     />
    ))}
   </div>
  </div>
 );
}

export default Slider;
