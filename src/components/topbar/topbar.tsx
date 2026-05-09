"use client";

import { Bell } from "lucide-react";

import { messages } from "@/i18n/messages";
import { useLanguage } from "@/i18n/use-language";

import { GlobalSearch } from "./global-search";
import { LanguageToggle } from "./language-toggle";

import styles from "./topbar.module.css";

export function Topbar() {
  const language = useLanguage((state) => state.language);

  const t = messages[language];

  return (
    <header className={styles.topbar}>
      <div className={styles.left}>
        <div>
          <span className={styles.eyebrow}>{t.topbar.workspace}</span>

          <h2>{t.topbar.title}</h2>
        </div>
      </div>

      <div className={styles.center}>
        <GlobalSearch />
      </div>

      <div className={styles.actions}>
        <button className={styles.iconButton}>
          <Bell size={18} />
        </button>

        <LanguageToggle />

        <div className={styles.avatar}>LL</div>
      </div>
    </header>
  );
}
