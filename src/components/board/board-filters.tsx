"use client";

import { Search } from "lucide-react";

import { messages } from "@/i18n/messages";
import { useLanguage } from "@/i18n/use-language";

import { useProjectStore } from "@/store/project-store";

import styles from "./board-filters.module.css";

export function BoardFilters() {
  const search = useProjectStore((state) => state.search);

  const setSearch = useProjectStore((state) => state.setSearch);

  const language = useLanguage((state) => state.language);

  const t = messages[language];

  return (
    <div className={styles.wrapper}>
      <div className={styles.search}>
        <Search size={16} />

        <input
          placeholder={t.search.placeholder}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <div className={styles.filters}>
        <button>{t.board.filters.all}</button>

        <button>{t.board.filters.high}</button>

        <button>{t.board.filters.blocked}</button>
      </div>
    </div>
  );
}
