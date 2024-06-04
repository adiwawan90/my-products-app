"use client";
import { useTheme } from "next-themes";
import { TextareaHTMLAttributes, forwardRef } from "react";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  label?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, Props>(function TextArea(
  { name, error, label, required, className, ...rest },
  ref,
) {
  const { theme } = useTheme();
  return (
    <fieldset className={`flex flex-col  ${className ? className : ""}`}>
      {label && (
        <label htmlFor={name} className="text-sm font-semibold mb-1 w-fit">
          {label + (required ? " *" : "")}
        </label>
      )}
      <textarea
        ref={ref}
        id={name}
        name={name}
        {...rest}
        className={`ring-1 ring-gray-500 rounded-sm p-3 shadow-md w-full resize-none ${theme === "dark" ? "bg-black-100 text-white " : "bg-white text-black-100"}`}
      />
      {error && <span className="text-sm text-red-600">{error}</span>}
    </fieldset>
  );
});

export default TextArea;
