import { Task } from "@/types/task";

export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Redesign onboarding flow",
    description: "Improve activation rate",
    assignee: "Emma",
    priority: "high",
    status: "progress",
    dueDate: "May 12",
  },

  {
    id: "2",
    title: "Build analytics API",
    description: "Realtime metrics pipeline",
    assignee: "Lucas",
    priority: "medium",
    status: "planning",
    dueDate: "May 15",
  },

  {
    id: "3",
    title: "Authentication QA",
    description: "Validate edge cases",
    assignee: "Sophia",
    priority: "high",
    status: "blocked",
    dueDate: "May 18",
  },

  {
    id: "4",
    title: "Mobile dashboard",
    description: "Responsive optimization",
    assignee: "Noah",
    priority: "low",
    status: "review",
    dueDate: "May 20",
  },
];
