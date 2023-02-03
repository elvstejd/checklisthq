import { Switch } from "@headlessui/react";

export function Toggle({
  label,
  onChange,
  value: enabled,
  description,
}: {
  label: string;
  onChange: (value: boolean) => void;
  value: boolean;
  description?: string;
}) {
  return (
    <div className="flex gap-4">
      <Switch
        checked={enabled}
        onChange={onChange}
        className={`${
          enabled ? "bg-blue-600" : "bg-gray-200"
        } relative inline-flex h-5 w-9 flex-shrink-0 items-center rounded-full`}
      >
        <span className="sr-only">{label}</span>
        <span
          className={`${
            enabled ? "translate-x-5" : "translate-x-1"
          } inline-block h-3 w-3 transform rounded-full bg-white transition`}
        />
      </Switch>
      <div>
        <span className="text-sm font-medium">{label}</span>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
}
