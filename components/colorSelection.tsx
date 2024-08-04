import { cva } from "class-variance-authority";
import React, { DetailedHTMLProps, ReactHTMLElement } from "react";

type ColorSelectionType = {
 colorName?: string;
 color: string;
 disabled?: boolean;
 active?: boolean;
};

const colorSelection = cva(
 [
  "relative flex items-center justify-center rounded-full border-2 transition bg-[--color] ring-[--color]",
  "disabled:after:absolute disabled:after:-bottom-1 disabled:after:-top-1 disabled:after:w-1 disabled:after:-rotate-45 disabled:ring-0 disabled:after:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed",
 ],
 {
  variants: {
   size: {
    default: "size-7",
    lg: "size-8",
    sm: "size-6",
   },
   active: {
    true: "ring-2",
   },
  },
  defaultVariants: {
   size: "default",
  },
 },
);

export function ColorSelection({
 colorName,
 color,
 disabled,
 active,
 ...props
}: ColorSelectionType & React.ButtonHTMLAttributes<HTMLButtonElement>) {
 return (
  <button
   aria-label={colorName}
   type="button"
   disabled={disabled}
   style={{ "--color": color } as React.CSSProperties}
   className={colorSelection({ active })}
   {...props}
  />
 );
}
