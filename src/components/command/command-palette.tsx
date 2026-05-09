"use client";

import { Command, Search } from "lucide-react";

import { AnimatePresence, motion } from "framer-motion";

import { useMemo } from "react";

import { messages } from "@/i18n/messages";
import { useLanguage } from "@/i18n/use-language";

import { useProjectStore } from "@/store/project-store";

import styles from "./command-palette.module.css";

export function CommandPalette() {
  const tasks = useProjectStore((state) => state.tasks);

  const commandOpen = useProjectStore((state) => state.commandOpen);

  const setCommandOpen = useProjectStore((state) => state.setCommandOpen);

  const globalSearch = useProjectStore((state) => state.globalSearch) || "";

  const setGlobalSearch = useProjectStore((state) => state.setGlobalSearch);

  const setSelectedTaskId = useProjectStore((state) => state.setSelectedTaskId);

  const language = useLanguage((state) => state.language);

  const t = messages[language];

  const results = useMemo(() => {
    if (!globalSearch) return [];

    return tasks.filter((task) =>
      [task.title, task.description, task.assignee, task.priority, task.status]
        .join(" ")
        .toLowerCase()
        .includes(globalSearch.toLowerCase()),
    );
  }, [tasks, globalSearch]);

  function handleOpenTask(taskId: string) {
    setSelectedTaskId(taskId);

    const element = document.getElementById(`task-${taskId}`);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }

    setCommandOpen(false);

    setGlobalSearch("");
  }

  return (
    <AnimatePresence>
      {commandOpen && (
        <>
          <motion.div
            className={styles.overlay}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={() => setCommandOpen(false)}
          />

          <motion.div
            className={styles.modal}
            initial={{
              opacity: 0,
              y: 20,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 20,
            }}
          >
            <div className={styles.search}>
              <Search size={18} />

              <input
                placeholder={t.command.placeholder}
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                autoFocus
              />

              <kbd>
                <Command size={12} /> K
              </kbd>
            </div>

            <div className={styles.results}>
              {results.length === 0 && (
                <div className={styles.empty}>{t.command.noResults}</div>
              )}

              {results.map((task) => (
                <button
                  key={task.id}
                  className={styles.item}
                  onClick={() => handleOpenTask(task.id)}
                >
                  <span>{t.command.task}</span>

                  <strong>{task.title}</strong>
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
