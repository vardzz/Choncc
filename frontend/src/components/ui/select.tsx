"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

type SelectProps = Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> & {
  onValueChange?: (value: string) => void;
};

export function Select({ className, children, value, defaultValue, onChange, onValueChange, disabled, name, id }: SelectProps) {
  const optionElements = React.Children.toArray(children).filter(React.isValidElement) as Array<
    React.ReactElement<React.OptionHTMLAttributes<HTMLOptionElement>>
  >;

  const resolvedDefaultValue =
    (defaultValue as string | undefined) ?? (optionElements[0]?.props.value as string | undefined) ?? "";

  const [internalValue, setInternalValue] = React.useState<string>(resolvedDefaultValue);
  const [open, setOpen] = React.useState(false);
  const isControlled = typeof value === "string";
  const selectedValue = isControlled ? value : internalValue;
  const selectedOption = optionElements.find((option) => String(option.props.value) === String(selectedValue));
  const rootRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  const commitValue = (nextValue: string) => {
    if (!isControlled) {
      setInternalValue(nextValue);
    }

    onValueChange?.(nextValue);

    if (onChange) {
      const syntheticEvent = {
        target: { value: nextValue, name, id },
        currentTarget: { value: nextValue, name, id },
      } as unknown as React.ChangeEvent<HTMLSelectElement>;
      onChange(syntheticEvent);
    }

    setOpen(false);
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        id={id}
        disabled={disabled}
        onClick={() => setOpen((current) => !current)}
        className={cn(
          "flex h-10 w-full cursor-pointer items-center justify-between rounded-xl border border-black/10 bg-white/75 px-3 text-sm text-zinc-900 shadow-sm shadow-zinc-200/50 transition-colors duration-500 ease-in-out hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-zinc-900/75 dark:text-zinc-100 dark:shadow-none dark:hover:bg-zinc-900",
          open ? "border-zinc-300 dark:border-zinc-700" : "",
          className,
        )}
      >
        <span className="truncate text-left">{selectedOption?.props.children ?? "Select"}</span>
        <ChevronDown className={cn("h-4 w-4 text-zinc-500 transition-transform duration-200 dark:text-zinc-400", open ? "rotate-180" : "")} />
      </button>

      {open ? (
        <div className="absolute left-0 right-0 top-full z-50 mt-1.5 overflow-hidden rounded-xl border border-black/5 bg-white/95 shadow-xl backdrop-blur-xl transition-colors duration-500 ease-in-out dark:border-white/10 dark:bg-zinc-900/95">
          <div className="max-h-56 overflow-y-auto p-1 zinc-scroll" role="listbox" aria-labelledby={id}>
            {optionElements.map((option, index) => {
              const optionValue = String(option.props.value ?? "");
              const selected = optionValue === String(selectedValue);
              const optionKey = `${optionValue || "option"}-${index}`;

              return (
                <button
                  key={optionKey}
                  type="button"
                  onClick={() => commitValue(optionValue)}
                  className={cn(
                    "flex w-full cursor-pointer items-center rounded-lg px-2.5 py-2 text-left text-xs font-medium transition-colors duration-200",
                    selected
                      ? "bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900"
                      : "text-zinc-600 hover:bg-black/5 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-white/8 dark:hover:text-zinc-50",
                    option.props.disabled ? "cursor-not-allowed opacity-45" : "",
                  )}
                  disabled={option.props.disabled}
                  role="option"
                  aria-selected={selected}
                >
                  {option.props.children}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
