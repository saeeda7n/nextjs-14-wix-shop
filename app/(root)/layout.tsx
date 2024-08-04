import React from "react";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

type RootLayoutProps = Readonly<{
 children: React.ReactNode;
}>;
export default function RootLayout({ children }: RootLayoutProps) {
 return (
  <React.Fragment>
   <Navbar />
   {children}
   <Footer />
  </React.Fragment>
 );
}
