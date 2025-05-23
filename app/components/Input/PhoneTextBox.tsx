import React from "react";
import PhoneInput, { Value } from "react-phone-number-input";
import "react-phone-number-input/style.css";

type PhoneTextBoxProps = {
  label: string;
  name: string;
  value: string;
  onChange: (value?: Value) => void;
  error?: string;
  required?: boolean;
};

export default function PhoneTextBox({
  label,
  name,
  value,
  onChange,
  error,
  required = false,
}: PhoneTextBoxProps) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <PhoneInput
        id={name}
        defaultCountry="IT"
        value={value}
        onChange={onChange}
        international
        className={`mt-1 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 ${
          error
            ? "border-red-500 focus:ring-red-400"
            : "border-gray-300 focus:ring-blue-500"
        }`}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600" id={`${name}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}
