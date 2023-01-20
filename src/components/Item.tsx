import { useState } from "react";
import clsx from "clsx";

interface ItemProps {
  title: string;
  done: boolean;
  isFirst: boolean;
  description?: string;
}

export default function Item({ title, done, isFirst, description }: ItemProps) {
  const [crossed, setCrossed] = useState(done);

  return (
    <div
      className={clsx(
        "group flex cursor-pointer items-center gap-4 border-t-gray-200 py-3",
        isFirst ? "border-t" : "border-t-0"
      )}
      onClick={() => setCrossed((v) => !v)}
    >
      <div
        className={clsx(
          "flex aspect-square h-10 items-center justify-center rounded-full border-2 transition-colors group-hover:border-blue-600",
          crossed ? "border-blue-600 bg-blue-600" : "bg-gray-100"
        )}
      >
        {crossed && checkIcon}
      </div>
      <div>
        <p
          className={clsx(
            "font-medium",
            crossed ? "text-gray-400 line-through" : "text-slate-900"
          )}
        >
          {title}
        </p>
        <p
          className={clsx("text-sm text-gray-500 ", crossed && "text-gray-300")}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

const checkIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-6 w-6 text-blue-50"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M4.5 12.75l6 6 9-13.5"
    />
  </svg>
);
