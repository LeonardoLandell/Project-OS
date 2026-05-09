"use client";

import {
  BarChart3,
  FolderKanban,
  LayoutDashboard,
  Sparkles,
} from "lucide-react";

import styles from "./mobile-bar.module.css";

export function MobileBar() {
  return (
    <div className={styles.bar}>
      <button>
        <LayoutDashboard size={20} />
      </button>

      <button>
        <FolderKanban size={20} />
      </button>

      <button className={styles.active}>
        <Sparkles size={20} />
      </button>

      <button>
        <BarChart3 size={20} />
      </button>
    </div>
  );
}
