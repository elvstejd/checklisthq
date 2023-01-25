import { Popover } from "@headlessui/react";
import { GearSix } from "phosphor-react";
import { useSettingsStore } from "../stores";
import { Toggle } from "./Toggle";

export function SettingsMenu() {
  const {
    setShowMultipleSections,
    setShowSectionTitles,
    showMultipleSections,
    showSectionTitles,
  } = useSettingsStore();

  return (
    <Popover className="relative">
      <Popover.Button className="rounded-lg  border bg-transparent p-2.5 text-sm font-semibold text-gray-500 transition-colors hover:bg-gray-100  active:bg-gray-200">
        <GearSix size={20} />
      </Popover.Button>
      <Popover.Panel className="absolute right-0 z-10 w-40 rounded-md bg-white p-4 shadow-md">
        <div className="flex flex-col gap-2">
          <Toggle
            value={showSectionTitles}
            onChange={(value) => setShowSectionTitles(value)}
            label="Section titles"
          />
          <Toggle
            value={showMultipleSections}
            onChange={(value) => setShowMultipleSections(value)}
            label="Multiple sections"
          />
        </div>
      </Popover.Panel>
    </Popover>
  );
}
