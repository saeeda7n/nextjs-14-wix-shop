import { Suspense } from "react";
import { getWixClient } from "@/libs/getWixClient";
import Slider from "@/components/slider";
import ProductList from "@/components/productList";
import CategoryList from "@/components/categoryList";
import { ProductListFallback } from "@/components/productListFallback";

export default async function HomePage() {
 const wix = getWixClient();

 const featured = async () =>
  wix.products
   .queryProducts()
   .limit(4)
   .eq("collectionIds", process.env.NEXT_PUBLIC_FEATURED_CATEGORY_ID)
   .find();
 const newest = async () =>
  wix.products.queryProducts().limit(4).ascending("lastUpdated").find();

 return (
  <main className="min-h-screen space-y-32">
   <Slider />
   <div className="container space-y-5">
    <h1 className="text-2xl font-semibold">Featured Products</h1>
    <Suspense fallback={<ProductListFallback />}>
     <ProductList query={featured} />
    </Suspense>
   </div>

   <div className="space-y-5">
    <h1 className="container text-2xl font-semibold">Categories</h1>
    <CategoryList />
   </div>

   <div className="container space-y-5">
    <h1 className="text-2xl font-semibold">New Products</h1>
    <Suspense fallback={<ProductListFallback />}>
     <ProductList query={newest} />
    </Suspense>
   </div>
  </main>
 );
}
