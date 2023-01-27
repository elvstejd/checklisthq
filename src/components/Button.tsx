import clsx from "clsx";

interface ButtonProps {
  children: string | JSX.Element;
  variant?: "default" | "outline";
  square?: boolean;
  size?: "md" | "sm";
  loading?: boolean;
  noBorder?: boolean;
  type?: "submit" | "button" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function Button({
  children,
  variant,
  square,
  size,
  noBorder,
  onClick,
  loading,
  type,
}: ButtonProps) {
  return (
    <button
      {...{ onClick, type }}
      disabled={loading}
      className={clsx(
        "rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 active:bg-blue-800 disabled:bg-gray-400",
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
      {loading ? "Loading..." : children}
    </button>
  );
}
