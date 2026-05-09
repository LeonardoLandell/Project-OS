"use client";

import { CommandPalette } from "@/components/command/command-palette";

import { useShortcuts } from "@/hooks/use-shortcut";

export function AppProvider({ children }: { children: React.ReactNode }) {
  useShortcuts();

  return (
    <>
      {children}

      <CommandPalette />
    </>
  );
}
