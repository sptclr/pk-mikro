/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";

export interface Option {
  value: string;
  label: string;
}

interface UseSelectProps<T = any> {
  options: T[];
  value: string | T;
  onChange?: (value: string | T) => void;
  onSearchChange?: (search: string) => void;
  maxDisplayOptions?: number;
  isLoading?: boolean;
  config?: {
    valueKey: string;
    labelKey: string;
  };
  returnObject?: boolean;
}

export function useSelect<T = any>({
  options = [],
  value = "",
  onChange,
  onSearchChange,
  maxDisplayOptions = 5,
  isLoading = false,
  config = { valueKey: "value", labelKey: "label" },
  returnObject = false,
}: UseSelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
  const [filteredOptions, setFilteredOptions] = useState<T[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [lastSearchTerm, setLastSearchTerm] = useState("");

  // Helper functions to extract value and label from options
  const getValue = (option: T): string => {
    if (!option) return "";
    return typeof option === "object"
      ? String((option as any)[config.valueKey] || "")
      : String(option);
  };

  const getLabel = (option: T): string => {
    if (!option) return "";
    return typeof option === "object"
      ? String((option as any)[config.labelKey] || "")
      : String(option);
  };

  // Find the selected option label
  const getSelectedLabel = (): string => {
    if (!value) return "";

    // If value is an object (returnObject is true)
    if (typeof value === "object") {
      return getLabel(value as T);
    }

    // If value is a string/id
    const selectedOption = options?.find(
      (option) => getValue(option) === value
    );
    return selectedOption ? getLabel(selectedOption) : "";
  };

  const selectedLabel = getSelectedLabel();

  // Set initial filtered options when dropdown opens
  useEffect(() => {
    if (isOpen && options.length > 0 && searchTerm === "") {
      setFilteredOptions(options.slice(0, maxDisplayOptions));
    }
  }, [isOpen, options, maxDisplayOptions, searchTerm]);

  // Handle local filtering when no onSearchChange
  useEffect(() => {
    if (!onSearchChange && debouncedSearchTerm !== "") {
      const filtered = options
        .filter((option) =>
          getLabel(option)
            .toLowerCase()
            .includes(debouncedSearchTerm.toLowerCase())
        )
        .slice(0, maxDisplayOptions);

      setFilteredOptions(filtered);
      setHighlightedIndex(filtered.length > 0 ? 0 : -1);
      setHasSearched(true);
    }
  }, [debouncedSearchTerm, options, maxDisplayOptions, onSearchChange]);

  // Handle external search
  useEffect(() => {
    // Only trigger search if conditions are met and it's a new search term
    if (
      onSearchChange &&
      isOpen &&
      debouncedSearchTerm !== "" &&
      debouncedSearchTerm !== lastSearchTerm
    ) {
      setIsSearching(true);
      setHasSearched(true);
      setLastSearchTerm(debouncedSearchTerm);
      onSearchChange(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, onSearchChange, isOpen, lastSearchTerm]);

  // Update search status when loading state changes
  useEffect(() => {
    if (!isLoading && isSearching) {
      setIsSearching(false);
    }
  }, [isLoading]);

  // Update filtered options when new options arrive after search
  useEffect(() => {
    if (hasSearched && !isLoading && options.length > 0) {
      setFilteredOptions(options.slice(0, maxDisplayOptions));
      setHighlightedIndex(options.length > 0 ? 0 : -1);
    }
  }, [options, hasSearched, isLoading, maxDisplayOptions]);

  const closeDropdown = () => {
    setIsOpen(false);
    setSearchTerm("");
    setHighlightedIndex(-1);
    setIsSearching(false);
    setHasSearched(false);
    setLastSearchTerm("");
  };

  const handleSelect = (option: T) => {
    if (onChange) {
      returnObject ? onChange(option) : onChange(getValue(option));
    }
    closeDropdown();
  };

  return {
    isOpen,
    setIsOpen,
    searchTerm,
    setSearchTerm,
    filteredOptions,
    highlightedIndex,
    setHighlightedIndex,
    isSearching,
    selectedLabel,
    closeDropdown,
    handleSelect,
    hasSearched,
    getValue,
    getLabel,
  };
}
