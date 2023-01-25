import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsStore {
  showSectionTitles: boolean;
  showMultipleSections: boolean;
  setShowMultipleSections: (value: boolean) => void;
  setShowSectionTitles: (value: boolean) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      showMultipleSections: false,
      showSectionTitles: false,
      setShowMultipleSections: (value) => set({ showMultipleSections: value }),
      setShowSectionTitles: (value) => set({ showSectionTitles: value }),
    }),
    {
      name: "settings",
    }
  )
);
