"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

import { messages } from "@/i18n/messages";

import { useLanguage } from "@/i18n/use-language";

import styles from "./workload-chart.module.css";

const data = [
  { week: "W1", tasks: 32 },
  { week: "W2", tasks: 48 },
  { week: "W3", tasks: 54 },
  { week: "W4", tasks: 61 },
  { week: "W5", tasks: 58 },
];

export function WorkloadChart() {
  const language = useLanguage((state) => state.language);

  const t = messages[language];

  return (
    <section className={styles.chart}>
      <div className={styles.header}>
        <div>
          <span>{t.analytics.subtitle}</span>

          <h3>{t.analytics.title}</h3>
        </div>
      </div>

      <div className={styles.container}>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={data}>
            <XAxis dataKey="week" />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="tasks"
              stroke="#8b5cf6"
              fill="#8b5cf6"
              fillOpacity={0.2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
