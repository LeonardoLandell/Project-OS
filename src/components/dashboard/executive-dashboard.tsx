"use client";

import {
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  Layers3,
  TrendingUp,
} from "lucide-react";

import { messages } from "@/i18n/messages";

import { useLanguage } from "@/i18n/use-language";

import styles from "./executive-dashboard.module.css";

const stats = [
  {
    title: "Active Projects",
    value: "12",
    growth: "+18%",
    icon: Layers3,
  },

  {
    title: "Tasks Completed",
    value: "842",
    growth: "+12%",
    icon: CheckCircle2,
  },

  {
    title: "Sprint Velocity",
    value: "94%",
    growth: "+6%",
    icon: TrendingUp,
  },

  {
    title: "Blocked Issues",
    value: "07",
    growth: "-2%",
    icon: Clock3,
  },
];

export function ExecutiveDashboard() {
  const language = useLanguage((state) => state.language);

  const t = messages[language];

  return (
    <section className={styles.wrapper}>
      <div className={styles.hero}>
        <div>
          <span className={styles.badge}>{t.dashboard.badge}</span>

          <h1>{t.dashboard.title}</h1>

          <p>{t.dashboard.description}</p>
        </div>

        <button className={styles.cta}>
          <BriefcaseBusiness size={18} />

          {t.dashboard.button}
        </button>
      </div>

      <div className={styles.grid}>
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.title} className={styles.card}>
              <div className={styles.cardTop}>
                <span>{item.title}</span>

                <div className={styles.icon}>
                  <Icon size={18} />
                </div>
              </div>

              <div className={styles.value}>{item.value}</div>

              <div className={styles.growth}>
                <ArrowUpRight size={14} />
                {item.growth} this month
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.panels}>
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h3>AI Operational Insights</h3>

            <span>Live analysis</span>
          </div>

          <div className={styles.aiList}>
            <div className={styles.aiItem}>
              Backend squad approaching overload risk.
            </div>

            <div className={styles.aiItem}>
              Mobile sprint velocity increased by 14%.
            </div>

            <div className={styles.aiItem}>
              Delivery forecast stable for next release.
            </div>

            <div className={styles.aiItem}>
              QA bottleneck detected in authentication flow.
            </div>
          </div>
        </div>

        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h3>Recent Activity</h3>

            <span>Last 24 hours</span>
          </div>

          <div className={styles.activity}>
            <div className={styles.activityItem}>
              <strong>Lucas</strong>

              <p>Moved onboarding redesign to review.</p>
            </div>

            <div className={styles.activityItem}>
              <strong>Emma</strong>

              <p>Completed API optimization tasks.</p>
            </div>

            <div className={styles.activityItem}>
              <strong>Noah</strong>

              <p>Created new sprint roadmap.</p>
            </div>

            <div className={styles.activityItem}>
              <strong>Sophia</strong>

              <p>Updated analytics documentation.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
