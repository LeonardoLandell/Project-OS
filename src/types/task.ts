export type TaskStatus =
  | "backlog"
  | "planning"
  | "progress"
  | "review"
  | "blocked"
  | "done";

export type TaskPriority = "low" | "medium" | "high";

export type Task = {
  id: string;
  title: string;
  description: string;
  assignee: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
};
