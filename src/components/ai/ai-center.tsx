"use client";

import { messages } from "@/i18n/messages";

import { useLanguage } from "@/i18n/use-language";

import styles from "./ai-center.module.css";

export function AICenter() {
  const language = useLanguage((state) => state.language);

  const t = messages[language];

  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <span>{t.ai.subtitle}</span>

        <h3>{t.ai.title}</h3>
      </div>

      <div className={styles.list}>
        <div className={styles.item}>Backend overload risk detected.</div>

        <div className={styles.item}>Sprint delivery probability: 92%</div>

        <div className={styles.item}>
          Authentication dependency blocking QA.
        </div>

        <div className={styles.item}>Mobile squad velocity increased.</div>
      </div>
    </section>
  );
}
