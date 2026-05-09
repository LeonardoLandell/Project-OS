"use client";

import dynamic from "next/dynamic";

const KanbanBoard = dynamic(
  () => import("./kanban-board").then((mod) => mod.KanbanBoard),
  {
    ssr: false,
  },
);

export function BoardClient() {
  return <KanbanBoard />;
}
