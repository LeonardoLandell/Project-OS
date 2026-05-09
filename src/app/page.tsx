import { AICenter } from "@/components/ai/ai-center";

import { WorkloadChart } from "@/components/analytics/workload-chart";

import { BoardClient } from "@/components/board/board-client";

import { ExecutiveDashboard } from "@/components/dashboard/executive-dashboard";

import { AppLayout } from "@/components/layout/app-layout";

export default function Page() {
  return (
    <AppLayout>
      <div
        style={{
          display: "grid",
          gap: 28,
        }}
      >
        <ExecutiveDashboard />

        <div className="analyticsGrid">
          <WorkloadChart />

          <AICenter />
        </div>

        <BoardClient />
      </div>
    </AppLayout>
  );
}
