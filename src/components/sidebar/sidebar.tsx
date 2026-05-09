import {
  BarChart3,
  CalendarDays,
  FolderKanban,
  LayoutDashboard,
  Settings,
  Sparkles,
  Users,
} from "lucide-react";
import styles from "./sidebar.module.css";

const navItems = [
  { label: "Executive", icon: LayoutDashboard, active: true },
  { label: "Projects", icon: FolderKanban },
  { label: "Roadmap", icon: CalendarDays },
  { label: "Analytics", icon: BarChart3 },
  { label: "Team", icon: Users },
  { label: "AI Center", icon: Sparkles },
  { label: "Settings", icon: Settings },
];

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <div className={styles.logo}>P</div>
        <div>
          <strong>ProjectOS</strong>
          <span>CEO Workspace</span>
        </div>
      </div>

      <nav className={styles.nav}>
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              className={`${styles.navItem} ${item.active ? styles.active : ""}`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className={styles.card}>
        <span>AI Forecast</span>
        <strong>Release risk: Low</strong>
        <p>Delivery velocity is stable for this sprint.</p>
      </div>
    </aside>
  );
}
