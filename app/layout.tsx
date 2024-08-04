import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { cn } from "@/libs/utils";
import ReactQueryProvider from "@/providers/reactQueryProvider";
import { Toaster } from "sonner";
import WixClientProvider from "@/providers/wixClientProvider";
import { cookies } from "next/headers";
import { TokenRole, Tokens } from "@wix/sdk";
import { getWixClient } from "@/libs/getWixClient";

const outfit = Outfit({
 subsets: ["latin"],
});

export const metadata: Metadata = {
 title: "Shop name",
 description: "A Demo shop",
};

type RootLayoutProps = Readonly<{
 children: React.ReactNode;
}>;
export default async function RootLayout({ children }: RootLayoutProps) {
 const member = cookies().get("refreshToken")?.value;
 const visitor = cookies().get("visitor_refreshToken")?.value || "{}";
 const refreshToken = member ? JSON.parse(member) : JSON.parse(visitor!);

 return (
  <html lang="en">
   <body className={cn(outfit.className)}>
    <ReactQueryProvider>
     <WixClientProvider tokens={{ refreshToken } as Tokens}>
      {children}
     </WixClientProvider>
    </ReactQueryProvider>
    <Toaster
     className={cn(outfit.className)}
     toastOptions={{
      className: "text-base w-full bg-white/70 backdrop-blur-2xl",
      descriptionClassName: "text-sm",
     }}
    />
   </body>
  </html>
 );
}
