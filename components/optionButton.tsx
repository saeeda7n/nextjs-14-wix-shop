import { cva } from "class-variance-authority";
import { cn } from "@/libs/utils";
import React, { PropsWithChildren } from "react";

type OptionButtonProps = {
 className?: string;
 active?: boolean;
 disabled?: boolean;
} & PropsWithChildren;

export function OptionButton({
 children,
 className,
 active,
 disabled,
 ...props
}: OptionButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
 const optionButton = cva(
  [
   `h-8 rounded-lg border border-emerald-500 px-4 text-sm font-medium text-emerald-500`,
   "disabled:bg-emerald-500 disabled:opacity-50 disabled:text-gray-50 disabled:cursor-not-allowed",
  ],
  {
   variants: {
    active: {
     true: "bg-emerald-500 text-gray-50",
    },
   },
  },
 );
 return (
  <button
   {...props}
   disabled={disabled}
   type="button"
   className={cn(optionButton({ active }), className)}
  >
   {children}
  </button>
 );
}
