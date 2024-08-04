import React from "react";
import { Loader } from "lucide-react";

const Loading = () => {
 return (
  <div className="flex flex-1 items-center justify-center">
   <Loader className="animate-spin" />
  </div>
 );
};

export default Loading;
