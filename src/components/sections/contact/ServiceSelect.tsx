"use client";

import { Select } from "@base-ui/react/select";
import { Check, ChevronDown } from "lucide-react";

export type ServiceOption = { value: string; label: string };

type ServiceSelectProps = {
  id?: string;
  options: ServiceOption[];
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  invalid?: boolean;
  "aria-describedby"?: string;
};

// Styled listbox in place of the native <select>: keyboard, typeahead and
// screen reader support come from Base UI.
export function ServiceSelect({ id, options, value, onChange, onBlur, invalid, ...aria }: ServiceSelectProps) {
  return (
    <Select.Root items={options} value={value} onValueChange={next => onChange(next ?? "")} onOpenChange={open => !open && onBlur?.()}>
      <Select.Trigger
        id={id}
        aria-invalid={invalid || undefined}
        aria-describedby={aria["aria-describedby"]}
        className="group flex w-full cursor-pointer items-center justify-between gap-3 bg-transparent text-start font-inter text-sm text-black outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-600 md:text-base dark:text-white"
      >
        <Select.Value className="truncate" />
        <Select.Icon className="shrink-0 text-[#797F8B] transition-transform duration-200 group-data-[popup-open]:rotate-180 dark:text-zinc-400">
          <ChevronDown className="size-4" aria-hidden="true" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Positioner sideOffset={10} alignItemWithTrigger={false} className="z-50 outline-none">
          <Select.Popup className="max-h-[min(20rem,var(--available-height))] w-[var(--anchor-width)] min-w-56 origin-[var(--transform-origin)] overflow-y-auto rounded-[8px] border border-[#AEAEAE]/40 bg-white p-1.5 shadow-[0_12px_32px_rgba(41,44,46,0.14)] outline-none transition-[opacity,transform] duration-150 data-[ending-style]:scale-[0.98] data-[ending-style]:opacity-0 data-[starting-style]:scale-[0.98] data-[starting-style]:opacity-0 motion-reduce:transition-none dark:border-white/10 dark:bg-[#1c1f21] dark:shadow-[0_12px_32px_rgba(0,0,0,0.5)]">
            <Select.List>
              {options.map(option => (
                <Select.Item
                  key={option.value}
                  value={option.value}
                  className="flex min-h-10 cursor-pointer select-none items-center justify-between gap-3 rounded-[5px] px-3 py-2 font-inter text-sm text-[#292c2e] outline-none data-[highlighted]:bg-[#292c2e] data-[highlighted]:text-white data-[selected]:font-medium dark:text-zinc-200 dark:data-[highlighted]:bg-[#98ff03] dark:data-[highlighted]:text-[#161819]"
                >
                  <Select.ItemText>{option.label}</Select.ItemText>
                  <Select.ItemIndicator>
                    <Check className="size-4" aria-hidden="true" />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.List>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}

export default ServiceSelect;
