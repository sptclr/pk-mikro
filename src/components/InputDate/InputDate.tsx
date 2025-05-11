/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parse, isValid } from "date-fns";
import {
  useController,
  Control,
  FieldValues,
  FieldPath,
} from "react-hook-form";

export interface InputDateProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  label?: string;
  value?: string;
  placeholder?: string;
  onChange?: (date: string) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  name: TName;
  control: Control<TFieldValues>;
  // Format output untuk disimpan ke dalam form state
  valueFormat?: string;
}

const InputDate = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  label,
  value,
  placeholder = "DD MMM YYYY",
  onChange,
  error,
  required = false,
  disabled = false,
  name,
  control,
  // Default ke DD-MM-YYYY untuk menyimpan di state
  valueFormat = "dd-MM-yyyy",
}: InputDateProps<TFieldValues, TName>) => {
  // Menggunakan useController dari react-hook-form
  const {
    field: { onChange: fieldOnChange, value: fieldValue, ref },
  } = useController({
    name,
    control,
  });

  // Mengelola nilai yang sebenarnya digunakan
  const effectiveValue = value !== undefined ? value : fieldValue;

  // Parsing nilai dari format yang disimpan (DD-MM-YYYY)
  const parseInputValue = (inputValue: string): Date | null => {
    if (!inputValue) return null;

    try {
      // Mencoba parsing dengan format yang disimpan (DD-MM-YYYY)
      const parsedDate = parse(inputValue, valueFormat, new Date());

      if (isValid(parsedDate)) {
        return parsedDate;
      }

      // Format alternatif untuk mendukung fleksibilitas
      const formatOptions = ["dd MMM yyyy", "yyyy-MM-dd", "MM/dd/yyyy"];

      for (const formatOption of formatOptions) {
        const attemptParse = parse(inputValue, formatOption, new Date());
        if (isValid(attemptParse)) {
          return attemptParse;
        }
      }

      return null;
    } catch (error) {
      console.error("Error parsing date:", error);
      return null;
    }
  };

  const parsedDate = effectiveValue
    ? parseInputValue(effectiveValue.toString())
    : null;
  const [selectedDate, setSelectedDate] = useState<Date | null>(parsedDate);

  // Sync perubahan nilai dari luar atau dari react-hook-form
  useEffect(() => {
    if (effectiveValue) {
      const parsedDate = parseInputValue(effectiveValue.toString());
      setSelectedDate(parsedDate);
    } else {
      setSelectedDate(null);
    }
  }, [effectiveValue]);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
      // Format untuk disimpan ke state form (DD-MM-YYYY)
      const formattedForState = format(date, valueFormat);

      // Update react-hook-form
      fieldOnChange(formattedForState);

      // Juga gunakan prop onChange jika disediakan
      onChange?.(formattedForState);
    } else {
      fieldOnChange("");
      onChange?.("");
    }
  };

  return (
    <div className="mb-4 flex gap-[10px] items-start">
      {label && (
        <label className="min-w-[174px] font-bold text-base">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      <div className="relative w-full [&>.react-datepicker-wrapper]:w-full">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="dd MMM yyyy" // Format untuk tampilan di input
          placeholderText={placeholder}
          disabled={disabled}
          ref={ref}
          className={`w-full px-4 py-2 border rounded-md outline-none transition-colors duration-200 ${
            error ? "border-red-500" : "border-gray-200"
          } ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`}
        />
        <img
          src="/icons/icon-calendar.svg"
          alt="icon calendar"
          className="absolute right-4 top-1/2 -translate-y-1/2"
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default InputDate;
