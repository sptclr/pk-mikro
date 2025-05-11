/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  useState,
  useRef,
  InputHTMLAttributes,
  ChangeEvent,
  FocusEvent,
  useEffect,
} from "react";

export interface AutocompleteOption {
  id: string;
  label: string;
  value: string;
  [key: string]: any;
}

export interface InputAutocompleteProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "onFocus" | "onBlur" | "value"
  > {
  label?: string;
  value?: string;
  placeholder?: string;
  onSearchChange?: (searchTerm: string) => void;
  onOptionSelect?: (option: AutocompleteOption) => void;
  options?: AutocompleteOption[];
  error?: string;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  required?: boolean;
}

const InputAutocomplete = ({
  label,
  value = "",
  placeholder = "Placeholder text",
  onSearchChange,
  onOptionSelect,
  options = [],
  error,
  isLoading = false,
  disabled = false,
  className = "",
  required = false,
  ...props
}: InputAutocompleteProps) => {
  const [inputValue, setInputValue] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Update input value when external value changes
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    if (hasSearched && inputValue.length > 0) {
      setIsOpen(true);
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    // Keep dropdown open for a moment to allow clicking on options
    setTimeout(() => {
      if (!dropdownRef.current?.contains(document.activeElement)) {
        setIsOpen(false);
      }
    }, 100);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.length > 0) {
      setHasSearched(true);
      setIsOpen(true);
      onSearchChange?.(value);
    } else {
      setIsOpen(false);
    }
  };

  const handleOptionClick = (option: AutocompleteOption) => {
    setInputValue(option.label);
    onOptionSelect?.(option);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleAddNew = () => {
    // Create a new option with the current input value
    const newOption = {
      id: "new",
      label: inputValue,
      value: inputValue,
      patientData: {
        nama_pasien: inputValue,
        // Bersihkan nilai-nilai lain yang mungkin sudah diisi sebelumnya
        id_pasien: "",
        tanggal_lahir: "",
        jenis_kelamin: "",
        no_rm: "",
        no_ktp: "",
        alamat_ktp: "",
        passport: "",
        kelurahan: "",
        kecamatan: "",
        kota: "",
        provinsi: "",
        domisili: "",
      },
    };
    onOptionSelect?.(newOption);
    setIsOpen(false);
  };

  const showDropdown = isOpen && (isLoading || inputValue.length > 0);

  return (
    <div className={`flex gap-[10px] items-start ${className}`}>
      {label && (
        <label
          htmlFor={props.id}
          className={`min-w-[174px] font-bold text-base whitespace-pre-line`}
        >
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      <div className="relative w-full">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full px-4 py-2 border rounded-md outline-none transition-colors duration-200
            ${
              disabled
                ? "border-anarya-border-disabled bg-anarya-input-disabled cursor-not-allowed"
                : ""
            }
            ${error ? "border-red-500" : ""}
            focus:border-pink-400
            ${!focused ? "border-gray-200" : ""}
          `}
          {...props}
        />

        {showDropdown && (
          <div
            ref={dropdownRef}
            className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto"
          >
            {isLoading ? (
              <div className="p-4 text-center text-gray-500">Loading...</div>
            ) : options.length > 0 ? (
              <>
                {options.map((option) => (
                  <div
                    key={option.id}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleOptionClick(option)}
                  >
                    <div className="font-medium">{option.label}</div>
                    {option.description && (
                      <div className="text-sm text-gray-500">
                        {option.description}
                      </div>
                    )}
                  </div>
                ))}
              </>
            ) : inputValue.length > 0 ? (
              <div
                className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-blue-600"
                onClick={handleAddNew}
              >
                + Pasien baru &quot;{inputValue}&quot;
              </div>
            ) : (
              <div className="p-4 text-center text-gray-500">
                No results found
              </div>
            )}
          </div>
        )}

        {error && (
          <p className="mt-1 text-sm transition-all text-red-500">{error}</p>
        )}
      </div>
    </div>
  );
};

export default InputAutocomplete;
