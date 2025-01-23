import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import clsx from "clsx";

import Loader from "./loader";
import { CheckIcon, ChevronsUpDown } from "lucide-react";

type Props = {
  className?: string;
  loading?: boolean;
  readOnly?: boolean;
  value: string;
  options: {
    value: string;
    label: string;
    items?: { label: string; value: string }[];
  }[];
  placeholder: string;
  inputPlaceholder?: string;
  renderSuffix?: () => React.ReactNode;
  onSelect: (value: string) => void;
};

const Combobox = React.forwardRef<HTMLButtonElement, Props>(
  (
    {
      className,
      loading,
      readOnly,
      value,
      options,
      placeholder,
      inputPlaceholder,
      renderSuffix,
      onSelect,
    }: Props,
    ref
  ) => {
    const [open, setOpen] = React.useState(false);

    const hasValue = options.find((option) =>
      !option.items
        ? option.value.toLowerCase() === value?.toLowerCase()
        : option.items.find(
            (o) => o.value.toLowerCase() === value?.toLowerCase()
          )
    );

    let selectedValue = placeholder;
    if (value) {
      for (let i = 0; i < options.length; i++) {
        const option = options[i];
        if (!option.items) {
          if (option.value.toLowerCase() === value.toLowerCase()) {
            selectedValue = option.label;
            break;
          }
        } else {
          const match = option.items.find(
            (item) => item.value.toLowerCase() === value.toLowerCase()
          );
          if (match) {
            selectedValue = match.label;
            break;
          }
        }
      }
    }

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={loading || !!readOnly}
            className={clsx(
              "justify-between w-full font-medium h-12",
              !hasValue && "font-normal text-muted-foreground"
            )}
            ref={ref}
          >
            {selectedValue}
            <div className="flex items-center justify-center w-4 h-4 ml-2 shrink-0">
              {!loading && (
                <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
              )}
              {loading && <Loader />}
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className={cn("p-0", className)} align="start">
          <Command>
            {options.length !== 0 && (
              <>
                <CommandInput placeholder={inputPlaceholder ?? "Search"} />
                <CommandEmpty>No results found.</CommandEmpty>
              </>
            )}
            {options.length === 0 && (
              <div className="flex items-center justify-center h-12">
                <p className="text-[12.8px] font-medium">Nothing to display</p>
              </div>
            )}

            <CommandList className="overflow-y-auto max-h-72">
              {options.map((option, index) => {
                if (!option.items) {
                  return (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      className="text-[12.8px] font-medium"
                      onSelect={(currentValue: string) => {
                        onSelect(currentValue);
                        setOpen(false);
                      }}
                    >
                      <CheckIcon
                        className={cn(
                          "mr-2 h-4 w-4",
                          value?.toLowerCase() === option.value.toLowerCase()
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      <div className="grow">{option.label}</div>
                      {renderSuffix && renderSuffix()}
                    </CommandItem>
                  );
                } else {
                  return (
                    <CommandGroup
                      key={option.label + index}
                      heading={option.label}
                    >
                      {option.items.map((item, i) => (
                        <CommandItem
                          key={item.value + i}
                          value={item.value}
                          className="text-[12.8px] font-medium"
                          onSelect={(currentValue: string) => {
                            onSelect(currentValue);
                            setOpen(false);
                          }}
                        >
                          <CheckIcon
                            className={cn(
                              "mr-2 h-4 w-4",
                              value?.toLowerCase() === item.value.toLowerCase()
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          <div className="grow">{item.label}</div>
                          {renderSuffix && renderSuffix()}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  );
                }
              })}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);

Combobox.displayName = "Combobox";

export default Combobox;
