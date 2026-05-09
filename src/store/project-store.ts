import { create } from "zustand";
import { persist } from "zustand/middleware";

import { mockTasks } from "@/mock/task";

import { Task, TaskPriority, TaskStatus } from "@/types/task";

type CreateTaskInput = {
  title: string;
  description: string;
  assignee: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
};

type Store = {
  tasks: Task[];

  search: string;

  globalSearch: string;

  selectedTaskId: string | null;

  commandOpen: boolean;

  setSearch: (value: string) => void;

  setGlobalSearch: (value: string) => void;

  setSelectedTaskId: (value: string | null) => void;

  setCommandOpen: (value: boolean) => void;

  moveTask: (taskId: string, status: TaskStatus) => void;

  createTask: (data: CreateTaskInput) => void;

  deleteTask: (taskId: string) => void;
};

export const useProjectStore = create<Store>()(
  persist(
    (set) => ({
      tasks: mockTasks,

      search: "",

      globalSearch: "",

      selectedTaskId: null,

      commandOpen: false,

      setSearch: (value) =>
        set({
          search: value,
        }),

      setGlobalSearch: (value) =>
        set({
          globalSearch: value,
        }),

      setSelectedTaskId: (value) =>
        set({
          selectedTaskId: value,
        }),

      setCommandOpen: (value) =>
        set({
          commandOpen: value,
        }),

      moveTask: (taskId, status) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  status,
                }
              : task,
          ),
        })),

      createTask: (data) =>
        set((state) => ({
          tasks: [
            {
              id: crypto.randomUUID(),

              ...data,
            },

            ...state.tasks,
          ],
        })),

      deleteTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== taskId),
        })),
    }),

    {
      name: "project-os-storage",
    },
  ),
);
