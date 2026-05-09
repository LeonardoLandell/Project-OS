"use client";

import { useEffect } from "react";

import { useProjectStore } from "@/store/project-store";

export function useShortcuts() {
  const commandOpen = useProjectStore((state) => state.commandOpen);

  const setCommandOpen = useProjectStore((state) => state.setCommandOpen);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const isCommand = event.metaKey || event.ctrlKey;

      const key = event.key.toLowerCase();

      if (isCommand && key === "k") {
        event.preventDefault();

        event.stopPropagation();

        setCommandOpen(!commandOpen);

        return;
      }

      if (key === "escape") {
        setCommandOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown, {
      capture: true,
    });

    return () => {
      window.removeEventListener("keydown", handleKeyDown, {
        capture: true,
      });
    };
  }, [commandOpen, setCommandOpen]);
}
