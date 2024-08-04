import React, { Suspense } from "react";
import { getWixClient } from "@/libs/getWixClient";
import ProductList from "@/components/productList";
import { FilterList } from "@/app/(root)/products/(root)/filterList";
import { ProductListFallback } from "@/components/productListFallback";

const ListPage = async ({ searchParams }: any) => {
 const productsPerPage = +process.env.PRODUCTS_PER_PAGE!;
 const wix = getWixClient();
 const { category, sort, page, q } = searchParams;
 const { items: categories } = await wix.collections.queryCollections().find();
 const collection = categories.find(
  ({ slug }) => slug === (category || "all-products"),
 );
 const [sorting, by] = (sort || "descending_lastUpdated").split("_");
 const productsQuery = async () =>
  wix.products
   .queryProducts()
   [sorting === "desc" ? "descending" : "ascending"](by)
   .eq("collectionIds", collection?._id)
   .limit(productsPerPage)
   .skip((+(page || 1) - 1) * productsPerPage)
   .startsWith("name", q || "")
   .find();
 return (
  <>
   <div className="container">
    <FilterList categories={categories} defaultCategory={collection} />
   </div>

   <section className="container space-y-5">
    <h1 className="text-2xl font-semibold">
     Products List ({collection?.name})
    </h1>
    <Suspense
     key={JSON.stringify(searchParams)}
     fallback={<ProductListFallback items={9} />}
    >
     <ProductList query={productsQuery} showPagination={true} />
    </Suspense>
   </section>
  </>
 );
};

export default ListPage;
