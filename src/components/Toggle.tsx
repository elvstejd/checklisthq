import { Switch } from "@headlessui/react";

export function Toggle({
  label,
  onChange,
  value: enabled,
}: {
  label: string;
  onChange: (value: boolean) => void;
  value: boolean;
}) {
  return (
    <div className="flex gap-4">
      <Switch
        checked={enabled}
        onChange={onChange}
        className={`${
          enabled ? "bg-blue-600" : "bg-gray-200"
        } relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full`}
      >
        <span className="sr-only">{label}</span>
        <span
          className={`${
            enabled ? "translate-x-6" : "translate-x-1"
          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
        />
      </Switch>
      <span className="text-base">{label}</span>
    </div>
  );
}
