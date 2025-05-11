/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  KeyboardEvent,
  ChangeEvent,
  FocusEvent,
  forwardRef,
  useRef,
  useEffect,
} from "react";
import { useSelect } from "./useSelect";

export interface SelectProps<T = any> {
  options?: T[];
  placeholder?: string;
  value?: string | T;
  onChange?: (value: string | T) => void;
  maxDisplayOptions?: number;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  label?: string | null;
  onSearchChange?: (search: string) => void;
  name?: string;
  error?: string;
  ref?: React.Ref<HTMLInputElement>;
  isLoading?: boolean;
  config?: {
    valueKey: string;
    labelKey: string;
  };
  returnObject?: boolean;
}

export const Select = forwardRef<HTMLInputElement, SelectProps>(
  (
    {
      options = [],
      placeholder = "Select an option",
      value = "",
      onChange,
      onSearchChange,
      maxDisplayOptions = 5,
      className = "",
      disabled = false,
      label = null,
      required = false,
      name,
      error,
      isLoading = false,
      config,
      returnObject = false,
      ...props
    },
    ref
  ) => {
    const {
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
    } = useSelect({
      options,
      value,
      onChange,
      onSearchChange,
      maxDisplayOptions,
      isLoading,
      config: config ?? { valueKey: "value", labelKey: "label" },
      returnObject,
    });

    const selectRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Handle forwarded ref
    const handleInputRef = (el: HTMLInputElement) => {
      // Assign to local ref
      inputRef.current = el;

      // Forward to react-hook-form ref
      if (typeof ref === "function") {
        ref(el);
      } else if (ref) {
        ref.current = el;
      }
    };

    // Handle click outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          selectRef.current &&
          !selectRef.current.contains(event.target as Node)
        ) {
          closeDropdown();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, [closeDropdown]);

    const handleToggle = () => {
      if (disabled) return;

      const newIsOpen = !isOpen;
      setIsOpen(newIsOpen);

      if (newIsOpen) {
        setSearchTerm("");
        setTimeout(() => inputRef.current?.focus(), 0);
      }
    };

    const handleInputFocus = () => {
      if (!disabled && !isOpen) {
        setIsOpen(true);
      }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
      if (!isOpen) {
        setIsOpen(true);
      }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (!isOpen) {
        if (e.key === "ArrowDown" || e.key === "Enter") {
          e.preventDefault();
          setIsOpen(true);
          return;
        }
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          handleSelect(filteredOptions[highlightedIndex]);
        } else if (filteredOptions.length > 0) {
          handleSelect(filteredOptions[0]);
        }
      } else if (e.key === "Escape") {
        closeDropdown();
      }
    };

    const handleInputBlur = (e: FocusEvent<HTMLInputElement>) => {
      if (!selectRef.current?.contains(e.relatedTarget as Node)) {
        // Delay to allow click events to process
        setTimeout(() => {
          closeDropdown();
        }, 150);
      }
    };

    // Determine if we should show loading state
    const showLoading = isSearching || isLoading;

    return (
      <div className="flex gap-[10px] items-start w-full">
        {label && (
          <label className="min-w-[174px] font-bold text-base">
            {label}
            <span className="font-bold text-red-600">{required && "*"}</span>
          </label>
        )}
        <div className="flex flex-col w-full">
          <div
            ref={selectRef}
            className={`relative w-full ${className}`}
            data-state={isOpen ? "open" : "closed"}
          >
            <div
              className={`relative h-10 w-full rounded-md border ${
                error ? "border-red-500" : "border-gray-200"
              } bg-white ${disabled ? "cursor-not-allowed bg-gray-100" : ""}`}
            >
              <input
                ref={handleInputRef}
                className={`w-full h-full rounded-md bg-transparent px-3 py-2 text-base focus:outline-none ${
                  error
                    ? "focus:ring-2 focus:ring-red-500"
                    : "focus:ring-2 focus:ring-anarya-input-outer"
                } text-ellipsis overflow-hidden whitespace-nowrap pr-8`}
                placeholder={disabled ? "Loading..." : placeholder}
                value={isOpen ? searchTerm : selectedLabel}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onKeyDown={handleKeyDown}
                onClick={() => !isOpen && handleToggle()}
                autoComplete="off"
                disabled={disabled}
                required={required}
                name={name}
                {...props}
              />
              <div
                className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={handleToggle}
              >
                {showLoading ? (
                  <svg
                    className="animate-spin h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    className={`h-4 w-4 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                )}
              </div>
            </div>

            {isOpen && (
              <div className="absolute z-10 mt-1 w-full overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg">
                {showLoading ? (
                  <div className="flex items-center justify-center p-4">
                    <svg
                      className="animate-spin h-5 w-5 text-gray-500 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Loading options...</span>
                  </div>
                ) : filteredOptions.length > 0 ? (
                  <ul className="max-h-60 overflow-auto p-1">
                    {filteredOptions.map((option, index) => (
                      <li
                        key={getValue(option)}
                        className={`cursor-pointer rounded-md px-3 py-2 text-sm ${
                          highlightedIndex === index
                            ? "bg-blue-100 text-blue-900"
                            : "hover:bg-gray-100"
                        }`}
                        onClick={() => handleSelect(option)}
                        onMouseEnter={() => setHighlightedIndex(index)}
                      >
                        {getLabel(option)}
                      </li>
                    ))}
                  </ul>
                ) : hasSearched ? (
                  <div className="px-3 py-2 text-center text-sm text-gray-500">
                    No options found
                  </div>
                ) : (
                  <div className="px-3 py-2 text-center text-sm text-gray-500">
                    Type to search
                  </div>
                )}
              </div>
            )}
          </div>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
