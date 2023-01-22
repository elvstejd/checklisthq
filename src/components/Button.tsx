import clsx from "clsx";
import React from "react";

interface ButtonProps {
  children: string | JSX.Element;
  variant?: "default" | "outline";
  square?: boolean;
  size?: "md" | "sm";
  noBorder?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function Button({
  children,
  variant,
  square,
  size,
  noBorder,
  onClick,
}: ButtonProps) {
  return (
    <button
      {...{ onClick }}
      className={clsx(
        "rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 active:bg-blue-800",
        {
          "border bg-transparent text-gray-500 hover:bg-gray-100  active:bg-gray-200":
            variant === "outline",
        },
        {
          "px-2.5": square === true,
        },
        {
          "text-sm": size === "sm",
        },
        {
          "border-none": noBorder === true,
        }
      )}
    >
      {children}
    </button>
  );
}
