import { Switch } from "@headlessui/react";
import clsx from "clsx";

export function Toggle({
  label,
  onChange,
  value: enabled,
  description,
  loading,
}: {
  label: string;
  onChange: (value: boolean) => void;
  value: boolean;
  description?: string;
  loading?: boolean;
}) {
  return (
    <div className="flex gap-4">
      <Switch
        checked={enabled}
        onChange={onChange}
        disabled={loading}
        className={clsx(
          "relative inline-flex h-5 w-9 flex-shrink-0 items-center rounded-full",
          enabled ? "bg-blue-600" : "bg-gray-200",
          loading && "opacity-60"
        )}
      >
        <span className="sr-only">{label}</span>
        <span
          className={clsx(
            enabled ? "translate-x-5" : "translate-x-1",
            "inline-block h-3 w-3 transform rounded-full bg-white transition"
          )}
        />
      </Switch>
      <div>
        <span className="text-sm font-medium">{label}</span>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
}
