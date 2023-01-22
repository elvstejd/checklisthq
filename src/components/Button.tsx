import clsx from "clsx";

interface ButtonProps {
  children: string | JSX.Element;
  variant?: "default" | "outline";
  square?: boolean;
  size?: "md" | "sm";
}

export default function Button({
  children,
  variant,
  square,
  size,
}: ButtonProps) {
  return (
    <button
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
        }
      )}
    >
      {children}
    </button>
  );
}
