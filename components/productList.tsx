import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ProductsQueryResult } from "@wix/stores_products";
import { products } from "@wix/stores";
import { Pagination } from "@/components/pagination";

function ProductCard({ product }: { product: products.Product }) {
 return (
  <div className="flex w-full flex-col gap-4">
   <Link
    href={`/products/${product.slug}`}
    prefetch={false}
    className="group relative h-80 w-full overflow-hidden rounded-md bg-gray-100"
   >
    <Image
     src={product.media?.mainMedia?.image?.url || ""}
     alt={"Shoes"}
     sizes={"30vw"}
     className="z-0 bg-gray-100 object-cover object-center"
     loading="eager"
     fill
    />
    {product.media?.items?.at(1) && (
     <Image
      src={product.media?.items.at(1)?.image?.url || ""}
      alt={"Shoes"}
      className="z-10 bg-gray-100 object-cover object-center opacity-0 transition duration-300 group-hover:opacity-100"
      fill
     />
    )}
   </Link>
   <div className="flex flex-1 flex-col">
    <div className="flex items-center justify-between">
     <Link
      href={`/products/${product.slug}`}
      prefetch={false}
      className="font-medium"
     >
      {product.name}
     </Link>
     <span className="font-medium">{product.price?.formatted?.price}</span>
    </div>
    <div
     className="line-clamp-2 text-sm text-gray-500"
     dangerouslySetInnerHTML={{
      __html:
       product.additionalInfoSections?.find((sec) => sec.title === "shortDesc")
        ?.description || "",
     }}
    ></div>
    <Link
     href={`/products/${product.slug}`}
     prefetch={false}
     className="mt-3 flex h-8 items-center self-start rounded-xl border border-emerald-400 px-3 text-xs font-semibold uppercase text-zinc-950 transition hover:bg-emerald-400"
    >
     Add To Cart
    </Link>
   </div>
  </div>
 );
}

function EmptyList() {
 return (
  <div className="flex flex-col items-center justify-center py-16">
   <Image
    src={"/assets/images/illustrations/undraw_location_search_re_ttoj.svg"}
    alt={"Empty list"}
    width={1024}
    height={1024}
    className="max-w-96 mix-blend-multiply"
   />
   <p className="mt-8 text-center text-lg">
    There is no item to show in this category :( please try something else.
   </p>
  </div>
 );
}

type Props = {
 query: () => Promise<ProductsQueryResult>;
 showPagination?: boolean;
};

const ProductList = async ({ query, showPagination }: Props) => {
 const products = await query();
 if (products.items.length <= 0) return <EmptyList />;
 products.totalPages;
 return (
  <div className="flex flex-col">
   <div className="grid grid-cols-1 gap-5 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    {products.items.map((product) => (
     <ProductCard product={product} key={product._id} />
    ))}
   </div>
   {showPagination && (
    <Pagination
     totalPages={products.totalPages!}
     hasNext={products.hasNext()}
     hasPrev={products.hasPrev()}
     currentPage={products.currentPage!}
    />
   )}
  </div>
 );
};
export default ProductList;
