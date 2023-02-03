import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsStore {
  enableMultipleSections: boolean;
  toggleMultipleSections: (value: boolean) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      enableMultipleSections: false,
      toggleMultipleSections: (value) =>
        set({
          enableMultipleSections: value,
        }),
    }),
    {
      name: "settings",
    }
  )
);
