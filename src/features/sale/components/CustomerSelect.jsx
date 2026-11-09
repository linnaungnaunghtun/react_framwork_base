import { useEffect, useState } from "react";
import { Check, ChevronsUpDown, LucideSearch } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useSWR from "swr";
import { debounce } from "lodash";
import { customerApiUrl, fetchCustomer } from "../../../services/customer";

export function CustomerSelect({
  register,
  setValue,
  inputName,
  handleChangeCustomer,
}) {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [q, setQ] = useState("");

  const { data: customerData, isLoading: customerLoading } = useSWR(
    `${customerApiUrl}${q ? `?q=${q}` : ""}`,
    fetchCustomer
  );

  const handleSearchInput = debounce((e) => {
    setQ(e.target.value);
  }, 500);

  const handleCustomerSelect = (currentValue) => {
    handleChangeCustomer(JSON.parse(currentValue));
    setSelectedValue(currentValue === selectedValue ? "" : currentValue);
    setOpen(false);
  };

  // useEffect(() => {
  //   if (defaultValue) {
  //     setSelectedValue(
  //       JSON.stringify({
  //         id: defaultValue.id,
  //         name: defaultValue.name,
  //         phone: defaultValue.phone,
  //       })
  //     );
  //     setQ(defaultValue.phone);
  //   }
  // }, []);

  useEffect(() => {
    if (selectedValue) {
      setValue(inputName, JSON.parse(selectedValue).id);
    } else {
      setValue(inputName, "");
    }
  }, [selectedValue]);

  return (
    <div className="">
      <input type="hidden" />

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            role="combobox"
            aria-expanded={open}
            className="bg-stone-50 border flex justify-between border-gray-300 focus:ring-primary-500 focus:border-primary-500  text-gray-900 text-sm rounded-lg  w-full p-2.5"
          >
            {selectedValue ? (
              <>
                <div className="">
                  <span>{JSON.parse(selectedValue).name}</span> - {` `}
                  <span className=" uppercase">
                    {JSON.parse(selectedValue).phone}
                  </span>
                </div>
              </>
            ) : (
              "Select Customer"
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-[350px] p-0">
          <Command>
            <div className=" flex gap-3 items-center p-1">
              <div className=" pl-3">
                <LucideSearch />
              </div>
              <input
                type="text"
                defaultValue={q}
                onChange={handleSearchInput}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-stone-500 focus:border-stone-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Customer with phone number"
              />
            </div>
            <CommandList>
              <CommandEmpty>No Customer found.</CommandEmpty>
              <CommandGroup>
                {customerLoading ? (
                  <div>Loading...</div>
                ) : (
                  customerData?.data?.map((customer) => {
                    const currentData = {
                      id: customer.id,
                      name: customer.name,
                      phone: customer.phone,
                      level: customer.level,
                    };

                    return (
                      <CommandItem
                        key={customer.id}
                        value={JSON.stringify(currentData)}
                        onSelect={handleCustomerSelect}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedValue &&
                              JSON.parse(selectedValue).id === customer.id
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        <div className=" flex items-center gap-2">
                          <div className="">
                            <p>{customer.name}</p>
                            <p className=" uppercase text-xs text-stone-400">
                              {customer.phone}
                            </p>
                          </div>
                        </div>
                      </CommandItem>
                    );
                  })
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
