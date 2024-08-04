import React, { Suspense } from "react";
import { ProductImages } from "@/app/(root)/products/[slug]/productImages";
import { getWixClient } from "@/libs/getWixClient";
import { notFound } from "next/navigation";
import { ProductContent } from "@/app/(root)/products/[slug]/productContent";
import ProductList from "@/components/productList";
import { ProductListFallback } from "@/components/productListFallback";
import { Metadata } from "next";

export async function generateMetadata({
 params: { slug },
}: Props): Promise<Metadata | undefined> {
 const wix = getWixClient();
 const {
  items: [product],
 } = await wix.products.queryProducts().eq("slug", slug).find();
 if (product)
  return {
   title: `Shop name | ${product.name}`,
  };
}
type Props = {
 params: {
  slug: string;
 };
};
const SingleProductPage = async ({ params: { slug } }: Props) => {
 const wix = getWixClient();
 const {
  items: [product],
 } = await wix.products.queryProducts().eq("slug", slug).find();
 if (!product) return notFound();

 const randomCollectionIds = product
  .collectionIds!.slice(0, product.collectionIds!.length - 1)
  .sort(() => (Math.random() > 0.5 ? 1 : -1));
 const similar = async () =>
  wix.products
   .queryProducts()
   .in("collectionIds", randomCollectionIds)
   .ne("_id", product._id)
   .limit(4)
   .descending("lastUpdated")
   .find();

 return (
  <main className="min-h-screen space-y-24 pt-10">
   <div className="container flex flex-col gap-10 border-b pb-16 lg:flex-row">
    <div className="top-20 h-max w-full lg:sticky lg:w-1/2">
     <ProductImages media={product.media} />
    </div>
    <div className="w-full lg:w-1/2">
     <ProductContent product={product} />
    </div>
   </div>

   <div className="container space-y-5">
    <h1 className="text-2xl font-semibold">Similar products</h1>
    <Suspense fallback={<ProductListFallback />}>
     <ProductList query={similar} />
    </Suspense>
   </div>
  </main>
 );
};

export default SingleProductPage;
