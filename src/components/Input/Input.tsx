/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import {
  useState,
  useRef,
  InputHTMLAttributes,
  ChangeEvent,
  FocusEvent,
} from "react";

export interface InputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "onFocus" | "onBlur"
  > {
  label?: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void; // <== ubah ke event
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void; // <== tambahkan ini
  error?: string;
  disabled?: boolean;
  className?: string;
  required?: boolean;
}

export const Input = ({
  label,
  value = "",
  placeholder = "Placeholder text",
  onChange,
  onBlur,
  error,
  disabled = false,
  className = "",
  required = false,
  type = "text",
  ...props
}: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [focused, setFocused] = useState(false);

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    setFocused(true);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    onBlur?.(e); // <- panggil RHF onBlur
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e); // <- panggil RHF onChange
  };

  const isError = !!error;

  return (
    <div className={`flex gap-[10px] items-start  ${className}`}>
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
          type={type}
          value={value}
          onChange={handleChange}
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
        {error && (
          <p className="mt-1 text-sm transition-all text-red-500">{error}</p>
        )}
      </div>
    </div>
  );
};

export default Input;
