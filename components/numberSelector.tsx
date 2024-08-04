import React, { useEffect, useState } from "react";
import { MinusIcon, PlusIcon } from "lucide-react";

type NumberSelectorProps = {
 defaultValue?: number;
 max?: number;
 min?: number;
 onChange?: (state: number) => void;
};
export function NumberSelector({
 defaultValue,
 onChange,
 max,
 min,
}: NumberSelectorProps) {
 min = min || 1;
 const [state, setState] = useState(defaultValue || 1);
 useEffect(() => {
  onChange && onChange(state);
 }, [state]);
 const canNotPlus = max ? state >= max : false;
 const canNotMinus = min ? state <= min : false;
 useEffect(() => {
  if (max && state > max) setState(max);
  if (min && state < min) setState(min);
 }, [max, min]);
 return (
  <div className="flex h-10 min-w-28 items-center justify-between gap-4 rounded-xl bg-gray-200 px-3">
   <button
    disabled={canNotMinus}
    className="disabled:opacity-50"
    onClick={() => setState((p) => p - 1)}
   >
    <MinusIcon size={16} />
   </button>
   <span className="font-semibold">{state}</span>
   <button
    disabled={canNotPlus}
    className="disabled:opacity-50"
    onClick={() => setState((p) => p + 1)}
   >
    <PlusIcon size={16} />
   </button>
  </div>
 );
}
