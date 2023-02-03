import clsx from "clsx";
import type { InputHTMLAttributes } from "react";
import { forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helpText?: string;
  error?: string;
}

export const TextInput = forwardRef<HTMLInputElement, InputProps>(
  ({ label, helpText, placeholder, error, ...rest }, ref) => {
    return (
      <div>
        {label && (
          <label
            htmlFor={label}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        <div className="mt-1">
          <input
            ref={ref}
            type="text"
            id={label}
            className={clsx(
              "block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm",
              {
                "border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500":
                  error,
              }
            )}
            placeholder={placeholder}
            {...rest}
          />
        </div>
        {helpText && (
          <p className="mt-2 text-sm text-gray-500" id="email-description">
            {helpText}
          </p>
        )}
        {error && (
          <p className="mt-2 text-sm text-red-600" id="email-error">
            {error}
          </p>
        )}
      </div>
    );
  }
);

TextInput.displayName = "TextInput";
