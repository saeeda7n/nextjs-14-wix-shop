import React from "react";
import { LoaderIcon } from "lucide-react";

const LoadingCartPage = () => {
 return (
  <div className="flex min-h-[calc(100vh-theme(spacing.16))] items-center justify-center">
   <LoaderIcon className="animate-spin" />
  </div>
 );
};

export default LoadingCartPage;
