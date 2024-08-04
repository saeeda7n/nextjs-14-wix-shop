"use client";
import React, { useState } from "react";
import { collections } from "@wix/stores";
import { SelectBox } from "@/components/selectBox";
import { SORT_BY } from "@/data/filters";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
 categories: collections.Collection[];
 defaultCategory?: collections.Collection;
};

export function FilterList({ categories, defaultCategory }: Props) {
 const searchParams = useSearchParams();
 const pathname = usePathname();
 const router = useRouter();
 const sort = searchParams.get("sort");
 const [query, setQuery] = useState(() => {
  return {
   category: defaultCategory || categories[0],
   sort: SORT_BY.find(({ value }) => sort === value) || "",
  };
 });

 function handleChange(key: string, value: any) {
  setQuery((p) => ({
   ...p,
   [key]: value,
  }));
 }

 function push(key: string, value: string) {
  const params = new URLSearchParams(searchParams);
  params.set(key, value);
  if (key === "category") params.set("page", "1");
  router.replace(`${pathname}?${params.toString()}` as any, {
   scroll: true,
  });
 }

 return (
  <div className="flex flex-wrap gap-4">
   <SelectBox
    nameKey="name"
    value={query.category}
    items={categories}
    onChange={(category) => {
     handleChange("category", category);
     push("category", category.slug);
    }}
   />

   <SelectBox
    nameKey="name"
    value={query.sort}
    items={SORT_BY}
    onChange={(sort) => {
     handleChange("sort", sort);
     push("sort", sort.value);
    }}
    label="Sort by"
    className="ml-auto max-w-44"
   />
  </div>
 );
}
