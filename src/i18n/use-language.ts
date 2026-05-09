"use client";

import { create } from "zustand";

type Language = "pt" | "en";

type Store = {
  language: Language;

  setLanguage: (language: Language) => void;
};

export const useLanguage = create<Store>((set) => ({
  language: "en",

  setLanguage: (language) =>
    set({
      language,
    }),
}));
