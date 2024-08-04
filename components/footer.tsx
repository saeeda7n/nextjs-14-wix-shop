import React from "react";
import {
 AtSignIcon,
 FacebookIcon,
 InstagramIcon,
 LinkedinIcon,
 PhoneIcon,
 TwitterIcon,
 XIcon,
} from "lucide-react";
import Link from "next/link";

function AboutShop() {
 return (
  <div className="max-w-96">
   <span className="text-xl font-semibold">Shop Name</span>
   <p className="mt-4 text-gray-400">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer consectetur
    massa eros, a laoreet purus fermentum posuere. Nunc vel congue augue.
    Vestibulum sit amet vehicula dolor.
   </p>

   <div className="mt-8 flex max-w-72 items-center gap-5">
    <a
     href="//instagrem.com"
     className="flex size-10 items-center justify-center rounded-xl bg-zinc-900 transition hover:invert"
    >
     <InstagramIcon />
    </a>
    <a
     href="//x.com"
     className="flex size-10 items-center justify-center rounded-xl bg-zinc-900 transition hover:invert"
    >
     <TwitterIcon />
    </a>
    <a
     href="//linkedin.com"
     className="flex size-10 items-center justify-center rounded-xl bg-zinc-900 transition hover:invert"
    >
     <LinkedinIcon />
    </a>
    <a
     href={"//facebook.com"}
     className="flex size-10 items-center justify-center rounded-xl bg-zinc-900 transition hover:invert"
    >
     <FacebookIcon />
    </a>
   </div>
  </div>
 );
}

function ShopLinks() {
 const links = [
  { name: "New Arrival", url: "/products?sort=desc_lastUpdated" },
  { name: "Accessories", url: "/products?category=accessories" },
  { name: "Men", url: "/products?category=man" },
  { name: "Woman", url: "/products?category=woman" },
  { name: "All Products", url: "/products" },
 ];
 return (
  <div className="max-w-96">
   <span className="text-xl font-semibold">Shop</span>
   <ul className="mt-4 space-y-2">
    {links.map((link) => (
     <li key={link.name} className="text-gray-300">
      <Link href={link.url as any}>{link.name}</Link>
     </li>
    ))}
   </ul>
  </div>
 );
}

function ContactUs() {
 return (
  <div className="max-w-48">
   <span className="text-xl font-semibold">Contact</span>
   <p className="mt-4 text-gray-300">
    75 Road Lsated Street, 600 New York, USA
   </p>
   <div className="mt-4 flex items-center gap-3">
    <AtSignIcon size={14} />
    <span>hello@shop.com</span>
   </div>
   <div className="mt-4 flex items-center gap-3">
    <PhoneIcon size={14} />
    <span>+98 930 392 9013</span>
   </div>
  </div>
 );
}

function NewsLetterForm() {
 return (
  <div className="w-full overflow-hidden sm:max-w-72">
   <span className="text-xl font-semibold">Newsletter</span>
   <p className="mt-4 text-gray-300">Be the first get the latest from us</p>
   <form action="" className="mt-4 flex">
    <input
     type="email"
     className="h-10 w-full border border-gray-50 bg-zinc-950 px-3 outline-none"
     placeholder="Email address"
    />
    <button className="h-10 bg-gray-50 px-4 font-semibold text-zinc-950">
     Submit
    </button>
   </form>
  </div>
 );
}

const Footer = () => {
 return (
  <footer className="mt-24 bg-zinc-950 py-16 text-gray-50">
   <div className="container flex flex-wrap justify-between gap-16">
    <AboutShop />
    <ShopLinks />
    <ContactUs />
    <NewsLetterForm />
   </div>
  </footer>
 );
};

export default Footer;
