"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap-trial/ScrollTrigger";
import { TextPlugin } from "gsap-trial/TextPlugin";

ScrollTrigger.defaults({ markers: !process.env.production });
if (typeof window === "object") {
 gsap.registerPlugin(ScrollTrigger);
 gsap.registerPlugin(TextPlugin);
}
export default gsap;
