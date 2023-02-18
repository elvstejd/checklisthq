import { create } from "zustand";

interface SettingsStore {
  enableMultipleSections: boolean;
  toggleMultipleSections: (value: boolean) => void;
  publishAsPublic: boolean;
  setPublishAsPublic: (value: boolean) => void;
}

export const useSettingsStore = create<SettingsStore>()((set) => ({
  enableMultipleSections: false,
  toggleMultipleSections: (value) =>
    set({
      enableMultipleSections: value,
    }),
  publishAsPublic: false,
  setPublishAsPublic: (value) =>
    set({
      publishAsPublic: value,
    }),
}));
