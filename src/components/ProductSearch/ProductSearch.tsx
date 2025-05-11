/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useState,
  useEffect,
  useRef,
  KeyboardEvent,
  ChangeEvent,
  FocusEvent,
  useMemo,
} from "react";
import { useDebounce } from "use-debounce";
import Image from "next/image";

export interface ProductOption {
  item_name?: string;
  item_code?: string;
  count_detail?: number;
  [key: string]: any | any[];
}

interface ProductSearchProps {
  options?: ProductOption[];
  placeholder?: string;
  onChange?: (value: ProductOption) => void;
  onSearch?: (searchTerm: string) => void; // Add this prop for search functionality
  maxDisplayOptions?: number;
  disabled?: boolean;
  selectedOptions?: ProductOption[];
}

const ProductSearch = ({
  options = [],
  placeholder = "Cari kode tes, nama tes, dan paket tes",
  onChange,
  onSearch, // Add this prop
  maxDisplayOptions = 5,
  disabled = false,
  selectedOptions,
}: ProductSearchProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const selectRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const stableOptions = useMemo(() => options || [], [options]);

  const filteredOptions = useMemo(() => {
    if (!debouncedSearchTerm) {
      return stableOptions.slice(0, maxDisplayOptions);
    }
    return stableOptions
      .filter((option) =>
        [option.item_name, option.item_code]
          .filter(Boolean)
          .some((value) =>
            value!.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
          )
      )
      .slice(0, maxDisplayOptions);
  }, [debouncedSearchTerm, stableOptions, maxDisplayOptions]);

  // Trigger onSearch when debounced search term changes
  useEffect(() => {
    if (onSearch && debouncedSearchTerm) {
      console.log("debounce", debouncedSearchTerm);
      onSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, onSearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
        setHighlightedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = () => {
    if (disabled) return;
    setIsOpen((prev) => !prev);
    setSearchTerm("");
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleSelect = (option: ProductOption) => {
    onChange?.(option);
    setSearchTerm(`${option.item_code} - ${option.item_name}`);
    setIsOpen(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setIsOpen(true);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen && (e.key === "ArrowDown" || e.key === "Enter")) {
      e.preventDefault();
      setIsOpen(true);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < filteredOptions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      e.preventDefault();
      handleSelect(filteredOptions[highlightedIndex]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setSearchTerm("");
      setHighlightedIndex(-1);
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setTimeout(() => {
      if (!selectRef.current?.contains(e.relatedTarget as Node)) {
        setIsOpen(false);
        setSearchTerm("");
        setHighlightedIndex(-1);
      }
    }, 150);
  };

  return (
    <div ref={selectRef} className="relative">
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <Image
            src="/icons/icon-search.png"
            alt="icon search"
            width={24}
            height={24}
          />
        </div>
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className="w-full border pl-12 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-anarya-input-outer rounded-md"
        />

        <div
          className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
          onClick={handleToggle}
        >
          <svg
            className={`h-4 w-4 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-4 w-full border bg-white rounded-md max-h-60 overflow-auto shadow-lg">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => {
              const isSelected = selectedOptions?.some(
                (selected) => selected.item_code === option.item_code
              );

              return (
                <div
                  key={option.item_code}
                  onClick={() => !isSelected && handleSelect(option)}
                  className={`px-3 py-2 ${
                    isSelected
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : index === highlightedIndex
                      ? "bg-anarya-hover text-white cursor-pointer"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <p
                    className={`font-medium ${
                      isSelected ? "text-gray-400" : ""
                    }`}
                  >
                    {option.item_name}
                  </p>
                  <p
                    className={`text-xs ${
                      isSelected ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    {option.item_code}
                  </p>
                </div>
              );
            })
          ) : (
            <div className="p-3 text-sm text-gray-500">Tidak ditemukan.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductSearch;
