import React from "react";
import { ChecklistForm } from "../../components/ChecklistForm";
import { Shell } from "../../components/Shell";
import { useSettingsStore } from "../../stores";
import { Toggle } from "../../components/Toggle";

export default function New() {
  return (
    <Shell
      pageTitle="New checklist"
      backTo="/dashboard"
      activePath="/dashboard"
    >
      <div className="flex flex-col md:grid md:grid-cols-12 md:gap-4">
        <div className=" md:col-span-8 lg:col-span-9">
          <ChecklistForm />
        </div>
        <div className="md:col-span-4 lg:col-span-3">
          <Settings />
        </div>
      </div>
    </Shell>
  );
}

export function Settings() {
  const { enableMultipleSections, toggleMultipleSections } = useSettingsStore();

  return (
    <>
      <h2 className="mt-8 mb-4 text-sm font-bold text-gray-400">SETTINGS</h2>
      <div className="flex flex-col gap-2 rounded-md border p-4">
        <Toggle
          value={enableMultipleSections}
          onChange={(value) => toggleMultipleSections(value)}
          label="Multiple sections"
          description="Allows you to break steps down into different sections, recommended for complex checklists."
        />
        <Toggle
          value={false}
          onChange={() => null}
          label="Publish as temporary"
          description="Checklist will be anonymous and deleted in 24 hours."
        />
      </div>
    </>
  );
}
