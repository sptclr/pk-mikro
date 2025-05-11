/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import {
  useState,
  useRef,
  useEffect,
  TextareaHTMLAttributes,
  ChangeEvent,
  FocusEvent,
} from "react";

export interface TextAreaProps
  extends Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    "onFocus" | "onBlur"
  > {
  label?: string;
  error?: string;
  className?: string;
  required?: boolean;
}

const TextArea = ({
  label,
  value = "",
  placeholder = "Placeholder text",
  onChange,
  error,
  disabled = false,
  className = "",
  required = false,
  rows = 4,
  maxLength,
  ...props
}: TextAreaProps) => {
  const [focused, setFocused] = useState(false);
  const [textValue, setTextValue] = useState(value);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setTextValue(value);
  }, [value]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(e.target.value);
    onChange?.(e);
  };

  const handleFocus = (e: FocusEvent<HTMLTextAreaElement>) => {
    setFocused(true);
  };

  const handleBlur = (e: FocusEvent<HTMLTextAreaElement>) => {
    setFocused(false);
  };

  return (
    <div className={`flex gap-[10px] items-start ${className}`}>
      {label && (
        <label
          htmlFor={props.id}
          className="min-w-[174px] font-bold text-base whitespace-pre-line"
        >
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      <div className="relative w-full">
        <textarea
          ref={textareaRef}
          value={textValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
          maxLength={maxLength}
          className={`
            w-full px-4 py-2
            border rounded-md
            outline-none
            resize-y
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
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        {maxLength && (
          <div className="mt-1 text-xs text-gray-500 text-right">
            {typeof textValue === "string"
              ? `${textValue.length}/${maxLength}`
              : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default TextArea;
