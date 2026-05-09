"use client";

import { useLanguage } from "@/i18n/use-language";

import styles from "./language-toggle.module.css";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={styles.toggle}>
      <button
        className={language === "pt" ? styles.active : ""}
        onClick={() => setLanguage("pt")}
      >
        PT
      </button>

      <button
        className={language === "en" ? styles.active : ""}
        onClick={() => setLanguage("en")}
      >
        EN
      </button>
    </div>
  );
}
