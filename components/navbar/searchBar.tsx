"use client";
import React, { FormEvent } from "react";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const SearchBar = () => {
 const router = useRouter();

 function handleSearch(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  const q = data.get("q");
  if (!q) return;
  router.push(`/products?q=${q}`);
 }

 return (
  <form
   onSubmit={handleSearch}
   aria-label="Search form"
   className="ms-auto hidden max-w-96 flex-1 items-center rounded-full bg-gray-100 pe-2 md:flex"
  >
   <input
    aria-label="search field"
    placeholder="Search"
    className="h-full flex-1 rounded-l-full bg-transparent px-5 py-2 outline-none focus-visible:outline"
    type="search"
    name="q"
   />
   <button aria-label="search button">
    <SearchIcon className="text-gray-500" />
   </button>
  </form>
 );
};

export default SearchBar;
