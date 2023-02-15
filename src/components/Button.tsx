import clsx from "clsx";
import type { Ref } from "react";

interface ButtonProps {
  children: string | JSX.Element;
  variant?: "default" | "outline" | "text";
  square?: boolean;
  loading?: boolean;
  noBorder?: boolean;
  type?: "submit" | "button" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  color?: "danger" | "default" | "warning";
  innerRef?: Ref<HTMLButtonElement>;
  icon?: JSX.Element;
}

export default function Button({
  children,
  variant,
  square,
  noBorder,
  onClick,
  loading,
  type,
  color,
  innerRef,
  icon,
}: ButtonProps) {
  return (
    <button
      {...{ onClick, type, ref: innerRef }}
      disabled={loading}
      className={clsx(
        "rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 active:bg-blue-800 disabled:bg-gray-400",
        {
          "border bg-transparent text-gray-800 hover:bg-gray-100  active:bg-gray-200":
            variant === "outline" || variant === "text",
        },
        {
          "px-2": square === true,
        },
        {
          "border-none": noBorder === true,
        },
        {
          "border-none": variant === "text",
        },
        {
          "bg-red-600 hover:bg-red-700 active:bg-red-800":
            (!variant || variant === "default") && color === "danger",
        },
        {
          "bg-yellow-300 text-yellow-900 hover:bg-yellow-400 active:bg-yellow-500":
            (!variant || variant === "default") && color === "warning",
        }
      )}
    >
      <div className="flex items-center gap-2">
        {icon && <span>{icon}</span>}
        <span>{loading ? "Loading..." : children}</span>
      </div>
    </button>
  );
}
