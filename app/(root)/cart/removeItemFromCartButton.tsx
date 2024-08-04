"use client";
import React from "react";
import { TrashIcon } from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";

export function RemoveItemFromCartButton({ id }: { id: string }) {
 const removeItem = useCartStore((state) => state.removeItem);

 return (
  <button onClick={() => removeItem(id)}>
   <TrashIcon className="text-red-500" />
  </button>
 );
}
