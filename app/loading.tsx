import React from "react";
import { Loader } from "lucide-react";

const Loading = () => {
 return (
  <div className="flex min-h-screen items-center justify-center">
   <div className="flex flex-col gap-2">
    <Loader className="animate-spin" />
    <span>Please wait a bit ...</span>
   </div>
  </div>
 );
};

export default Loading;
