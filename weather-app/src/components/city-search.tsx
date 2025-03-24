import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Loader2, Search } from "lucide-react";
import { useLocationSearch } from "@/hooks/use-weather";

const CitySearch = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const [ data: locations, isLoading] = useLocationSearch(query)
  const handleSelect = () => {}
  return (
    <>
      <Button
        variant="outline"
        className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        Search cities...{" "}
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search cities..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
            { query.length > 2 && !isLoading && (
                <CommandEmpty>No results found.</CommandEmpty>
            )}         
          <CommandGroup heading="Favorites">
            <CommandItem>Calendar</CommandItem>
          </CommandGroup>
          <CommandGroup heading="Recent Searches">
            <CommandItem>Search Emoji</CommandItem>
          </CommandGroup>

        { locations && locations.length > 0 && (
            <CommandGroup heading="Suggestions">
                {isLoading && (
                    <div className="flex items-center justify-center p-4">
                        <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                )}
            <CommandItem>Calculator</CommandItem>
          </CommandGroup>
        )} 
        { locations.map((location) => {
            return (
                <CommandItem key={`${location.lat}-${location.lon}`}
                    value={`${location.lat} | ${location.lon} | ${location.name} | ${location.country}`}
                    onSelect={handleSelect}
                >
                    <Search className="mr=2 h-4 w-4" />
                    <span>
                    {location.name}
                    </span>
                    </CommandItem>
            )
        })}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default CitySearch;
