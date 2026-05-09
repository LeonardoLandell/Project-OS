"use client";

import { Command, Search } from "lucide-react";

import { useMemo } from "react";

import { messages } from "@/i18n/messages";

import { useLanguage } from "@/i18n/use-language";

import { useProjectStore } from "@/store/project-store";

import styles from "./global-search.module.css";

const aiResults = [
  "Backend overload risk",
  "Sprint velocity increased",
  "Authentication bottleneck",
];

const analyticsResults = ["Delivery Velocity", "Operational Analytics"];

type SearchResult = {
  type: string;
  title: string;
  id?: string;
};

export function GlobalSearch() {
  const tasks = useProjectStore((state) => state.tasks);

  const globalSearch = useProjectStore((state) => state.globalSearch) || "";

  const setGlobalSearch = useProjectStore((state) => state.setGlobalSearch);

  const setSelectedTaskId = useProjectStore((state) => state.setSelectedTaskId);

  const language = useLanguage((state) => state.language);

  const t = messages[language];

  const query = globalSearch.trim().toLowerCase();

  const results = useMemo<SearchResult[]>(() => {
    if (!query) return [];

    const taskResults = tasks
      .filter((task) =>
        [
          task.title,
          task.description,
          task.assignee,
          task.priority,
          task.status,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query),
      )
      .map((task) => ({
        type: t.command.task,
        title: task.title,
        id: task.id,
      }));

    const aiMatches = aiResults
      .filter((item) => item.toLowerCase().includes(query))
      .map((item) => ({
        type: "AI",
        title: item,
      }));

    const analyticsMatches = analyticsResults
      .filter((item) => item.toLowerCase().includes(query))
      .map((item) => ({
        type: "Analytics",
        title: item,
      }));

    return [...taskResults, ...aiMatches, ...analyticsMatches].slice(0, 8);
  }, [query, tasks, t]);

  function handleTaskClick(taskId?: string) {
    if (!taskId) return;

    setSelectedTaskId(taskId);

    const element = document.getElementById(`task-${taskId}`);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      element.classList.add(styles.flash);

      setTimeout(() => {
        element.classList.remove(styles.flash);
      }, 1600);
    }

    setGlobalSearch("");
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.search}>
        <Search size={16} />

        <input
          placeholder={t.topbar.searchPlaceholder}
          value={globalSearch}
          onChange={(e) => setGlobalSearch(e.target.value)}
        />

        <kbd>
          <Command size={12} />K
        </kbd>
      </div>

      {results.length > 0 && (
        <div className={styles.dropdown}>
          {results.map((result, index) => (
            <button
              key={`${result.title}-${index}`}
              className={styles.result}
              onClick={() => handleTaskClick(result.id)}
            >
              <span>{result.type}</span>

              <strong>{result.title}</strong>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
