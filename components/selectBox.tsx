import {
 Listbox,
 ListboxButton,
 ListboxOption,
 ListboxOptions,
 Transition,
} from "@headlessui/react";
import { cn } from "@/libs/utils";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import React from "react";

type Props = {
 items: any[];
 value?: any;
 onChange?: (value: any) => void;
 nameKey: string;
 label?: string;
 className?: string;
};

export function SelectBox({
 items,
 onChange,
 value,
 nameKey,
 label,
 className,
}: Props) {
 return (
  <Listbox value={value} onChange={onChange}>
   <ListboxButton
    className={cn(
     "relative block w-full max-w-56 rounded-lg border bg-white/5 py-1.5 pl-3 pr-8 text-left text-sm/6",
     "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
     className,
    )}
   >
    {value ? value?.[nameKey] : label}
    <ChevronDownIcon
     className="group pointer-events-none absolute right-2.5 top-2.5 size-4 fill-white/60"
     aria-hidden="true"
    />
   </ListboxButton>
   <Transition
    enter="transition ease-out duration-200"
    enterFrom="opacity-0 -translate-y-1"
    enterTo="opacity-100 translate-y-0"
    leave="transition ease-in duration-150"
    leaveFrom="opacity-100 translate-y-0"
    leaveTo="opacity-0 translate-y-1"
   >
    <ListboxOptions
     anchor="bottom"
     className="w-[var(--button-width)] rounded-xl border border-white/5 bg-white p-1 shadow [--anchor-gap:var(--spacing-1)] focus:outline-none"
    >
     {items.map((item, index) => (
      <ListboxOption
       value={item}
       className="group flex cursor-default select-none items-center gap-2 rounded-lg px-3 py-1.5"
       key={index}
       {...{
        ["data-selected"]:
         JSON.stringify(item) === JSON.stringify(value) ? true : null,
       }}
      >
       <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
       <div className="text-sm/6">{item?.[nameKey]}</div>
      </ListboxOption>
     ))}
    </ListboxOptions>
   </Transition>
  </Listbox>
 );
}
