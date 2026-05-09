"use client";

import { useEffect, useMemo, useState } from "react";

import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import { CSS } from "@dnd-kit/utilities";

import { LayoutGroup } from "framer-motion";

import { BoardFilters } from "@/components/board/board-filters";

import { CreateTaskModal } from "@/components/modals/create-task-modal";

import { TaskModal } from "@/components/modals/task-modal";

import { TaskCard } from "@/components/task/task-cad";

import { messages } from "@/i18n/messages";

import { useLanguage } from "@/i18n/use-language";

import { useProjectStore } from "@/store/project-store";

import { Task, TaskStatus } from "@/types/task";

import styles from "./kanban-board.module.css";

function DroppableColumn({
  id,
  title,
  tasks,
  onSelectTask,
}: {
  id: TaskStatus;
  title: string;
  tasks: Task[];
  onSelectTask: (task: Task) => void;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <section
      ref={setNodeRef}
      className={`${styles.column} ${isOver ? styles.columnOver : ""}`}
    >
      <div className={styles.columnHeader}>
        <h3>{title}</h3>

        <span>{tasks.length}</span>
      </div>

      <div className={styles.taskList}>
        {tasks.length === 0 && (
          <div className={styles.empty}>No tasks found</div>
        )}

        {tasks.map((task) => (
          <DraggableTask
            key={task.id}
            task={task}
            onClick={() => onSelectTask(task)}
          />
        ))}
      </div>
    </section>
  );
}

function DraggableTask({ task, onClick }: { task: Task; onClick: () => void }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={isDragging ? styles.dragging : ""}
    >
      <TaskCard task={task} onClick={onClick} />
    </div>
  );
}

export function KanbanBoard() {
  const tasks = useProjectStore((state) => state.tasks);

  const search = useProjectStore((state) => state.search);

  const moveTask = useProjectStore((state) => state.moveTask);

  const selectedTaskId = useProjectStore((state) => state.selectedTaskId);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [openCreate, setOpenCreate] = useState(false);

  const language = useLanguage((state) => state.language);

  const t = messages[language];

  useEffect(() => {
    if (!selectedTaskId) return;

    const task = tasks.find((item) => item.id === selectedTaskId);

    if (task) {
      setSelectedTask(task);
    }
  }, [selectedTaskId, tasks]);

  const columns: {
    id: TaskStatus;
    title: string;
  }[] = [
    {
      id: "backlog",
      title: t.board.columns.backlog,
    },

    {
      id: "planning",
      title: t.board.columns.planning,
    },

    {
      id: "progress",
      title: t.board.columns.progress,
    },

    {
      id: "review",
      title: t.board.columns.review,
    },

    {
      id: "blocked",
      title: t.board.columns.blocked,
    },

    {
      id: "done",
      title: t.board.columns.done,
    },
  ];

  const filteredTasks = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) return tasks;

    return tasks.filter((task) => {
      const searchableText = [
        task.title,
        task.description,
        task.assignee,
        task.priority,
        task.status,
        task.dueDate,
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(normalizedSearch);
    });
  }, [tasks, search]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const taskId = String(active.id);

    const newStatus = String(over.id) as TaskStatus;

    moveTask(taskId, newStatus);
  }

  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <div>
          <span>{t.board.subtitle}</span>

          <h2>{t.board.title}</h2>
        </div>

        <button onClick={() => setOpenCreate(true)}>+ {t.board.button}</button>
      </div>

      <BoardFilters />

      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <LayoutGroup>
          <div className={styles.board}>
            {columns.map((column) => (
              <DroppableColumn
                key={column.id}
                id={column.id}
                title={column.title}
                tasks={filteredTasks.filter(
                  (task) => task.status === column.id,
                )}
                onSelectTask={setSelectedTask}
              />
            ))}
          </div>
        </LayoutGroup>
      </DndContext>

      <TaskModal
        open={!!selectedTask}
        task={selectedTask}
        onClose={() => setSelectedTask(null)}
      />

      <CreateTaskModal open={openCreate} onClose={() => setOpenCreate(false)} />
    </section>
  );
}
