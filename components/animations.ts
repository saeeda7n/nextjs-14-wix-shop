import gsap from "@/libs/gsap";

export function slideAnimation(currentSlide: number, previousSlide: number) {
 const sign = currentSlide > previousSlide ? -1 : -1;
 gsap.timeline().fromTo(
  ".slide",
  {
   xPercent: (index): any => {
    if (index === currentSlide) return (index + sign) * -100;
    if (index === previousSlide) return index * -100;

    return undefined;
   },
  },
  {
   ease: "power3.out",
   duration: 1.5,
   xPercent: (index): any => {
    if (index === previousSlide) return (index + sign * -1) * -100;
    if (index === currentSlide) return index * -100;
    return undefined;
   },
  },
 );
}
