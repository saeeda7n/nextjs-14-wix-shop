import { useContext } from "react";
import { wixContext } from "@/providers/wixClientProvider";

export const useWix = () => {
 const context = useContext(wixContext);
 if (!context)
  throw new Error("useWix has to be used within <WixClientProvider>");
 return context.wixClient!;
};
