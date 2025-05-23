import React from "react";

type TextBoxProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
};

import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function TextBox({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  required = false,
}: TextBoxProps) {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="mb-5 relative">
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-gray-900"
      >
        {label}
        {required && <span className="text-red-600 ml-1">*</span>}
      </label>
      <div className="relative mt-1">
        <input
          id={name}
          name={name}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full px-4 py-2 pr-10 border rounded-md bg-white text-gray-900 placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-offset-1 ${
              error
                ? "border-red-600 focus:ring-red-600"
                : "border-gray-300 focus:ring-blue-600"
            }`}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
        />
        {type === "password" && value !== "" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
            tabIndex={-1}
            aria-label={showPassword ? "Nascondi password" : "Mostra password"}
          >
            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        )}
      </div>
      {error && (
        <p
          id={`${name}-error`}
          className="mt-1 text-sm font-medium text-red-700"
        >
          {error}
        </p>
      )}
    </div>
  );
}
