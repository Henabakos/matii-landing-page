"use client";

import * as React from "react";
import svgPaths from "@/lib/svgPaths";
import { cn } from "@/lib/utils";

interface AccordionContextType {
  value?: string | string[];
  onValueChange?: (val: string) => void;
  type?: "single" | "multiple";
  collapsible?: boolean;
}

const AccordionContext = React.createContext<AccordionContextType>({});

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "single" | "multiple";
  collapsible?: boolean;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

export function Accordion({
  type = "single",
  collapsible = true,
  defaultValue,
  value: controlledValue,
  onValueChange,
  className,
  children,
  ...props
}: AccordionProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState<
    string | undefined
  >(defaultValue);

  const currentValue =
    controlledValue !== undefined ? controlledValue : uncontrolledValue;

  const handleValueChange = (itemValue: string) => {
    let newValue: string | undefined;
    if (currentValue === itemValue) {
      if (collapsible) {
        newValue = "";
      } else {
        newValue = itemValue;
      }
    } else {
      newValue = itemValue;
    }

    if (controlledValue === undefined) {
      setUncontrolledValue(newValue);
    }
    onValueChange?.(newValue || "");
  };

  return (
    <AccordionContext.Provider
      value={{
        value: currentValue,
        onValueChange: handleValueChange,
        type,
        collapsible,
      }}
    >
      <div className={cn("space-y-4", className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

interface AccordionItemContextType {
  value: string;
  isOpen: boolean;
}

const AccordionItemContext = React.createContext<AccordionItemContextType>({
  value: "",
  isOpen: false,
});

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export function AccordionItem({
  value,
  className,
  children,
  ...props
}: AccordionItemProps) {
  const { value: selectedValue } = React.useContext(AccordionContext);
  const isOpen = selectedValue === value;

  return (
    <AccordionItemContext.Provider value={{ value, isOpen }}>
      <div
        className={cn(
          "relative bg-[#f3f4f6] dark:bg-white/5 border border-[rgba(174,174,174,0.3)] dark:border-white/10 shadow-sm overflow-hidden transition-colors duration-200",
          isOpen && "border-[#98ff03] dark:border-[#98ff03]",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

export function AccordionTrigger({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { value, isOpen } = React.useContext(AccordionItemContext);
  const { onValueChange } = React.useContext(AccordionContext);

  return (
    <button
      type="button"
      onClick={() => onValueChange?.(value)}
      aria-expanded={isOpen}
      className={cn(
        "flex w-full items-center justify-between p-5 md:p-6 text-left font-urbanist font-medium text-lg md:text-[20px] text-[#292c2e] dark:text-white transition-all hover:opacity-90 cursor-pointer",
        className,
      )}
      {...props}
    >
      <span className="capitalize">{children}</span>
      {/* Dark Square Icon Badge matching template Frame73 & Frame77 */}
      <div
        className={cn(
          "bg-[#292c2e] dark:bg-[#222527] dark:border dark:border-white/10 size-9 md:size-10 rounded-[6px] shrink-0 flex items-center justify-center p-2 text-[#98ff03] shadow-sm ml-4 transition-transform duration-300",
          isOpen && "rotate-45",
        )}
      >
        <svg className="size-5" fill="none" viewBox="0 0 24 24">
          <path d={svgPaths.p1ec8aa00} fill="#98FF03" />
        </svg>
      </div>
    </button>
  );
}

export function AccordionContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { isOpen } = React.useContext(AccordionItemContext);

  return (
    <div
      className={cn(
        "grid transition-all duration-300 ease-in-out",
        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
      )}
      {...props}
    >
      <div className="overflow-hidden">
        <div
          className={cn(
            "px-5 md:px-6 pb-6 pt-0 font-inter font-normal text-sm md:text-base text-[#797f8b] dark:text-zinc-400 leading-relaxed transition-colors",
            className,
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
