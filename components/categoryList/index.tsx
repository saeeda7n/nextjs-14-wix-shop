import React from "react";
import { CategoryListClient } from "@/components/categoryList/categoryListClient";
import { getWixClient } from "@/libs/getWixClient";

const CategoryList = async () => {
 const wix = getWixClient();

 const { items } = await wix.collections.queryCollections().find();
 return <CategoryListClient categories={items} />;
};

export default CategoryList;
