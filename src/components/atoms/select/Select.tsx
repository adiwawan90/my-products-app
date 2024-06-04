"use client";

import { useTheme } from "next-themes";
import { SelectHTMLAttributes, forwardRef } from "react";

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  label: string;
  options: { label: string; value: string | number }[];
}

const Select = forwardRef<HTMLSelectElement, Props>(function Select(
  { name, error, label, required, className, options, ...rest },
  ref,
) {
  const { theme } = useTheme();
  return (
    <fieldset className={`flex flex-col ${className ? className : ""}`}>
      <label htmlFor={name} className="text-sm font-semibold mb-1">
        {label + (required ? " *" : "")}
      </label>
      <select
        ref={ref}
        id={name}
        name={name}
        {...rest}
        className={`ring-1 ring-gray-500 rounded-sm p-3 shadow-md h-11 ${theme === "dark" ? "bg-black-100 text-white " : "bg-white text-black-100"}`}
      >
        <option key="" value="">
          Choose an option...
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="text-sm text-red-600">{error}</span>}
    </fieldset>
  );
});

export default Select;
