import { Sidebar } from "@/components/sidebar/sidebar";

import { Topbar } from "@/components/topbar/topbar";

import { AppProvider } from "@/components/providers/app-provider";

import styles from "./app-layout.module.css";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <div className={styles.shell}>
        <Sidebar />

        <div className={styles.workspace}>
          <Topbar />

          <main className={styles.main}>{children}</main>
        </div>
      </div>
    </AppProvider>
  );
}
