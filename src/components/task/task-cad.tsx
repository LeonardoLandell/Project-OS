"use client";

import { motion } from "framer-motion";

import { CalendarDays, GripVertical } from "lucide-react";

import { Task } from "@/types/task";

import styles from "./task-card.module.css";

type TaskCardProps = {
  task: Task;
  onClick?: () => void;
};

export function TaskCard({ task, onClick }: TaskCardProps) {
  return (
    <motion.article
      id={`task-${task.id}`}
      layout
      onClick={onClick}
      whileHover={{
        y: -3,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 22,
      }}
      className={styles.card}
    >
      <div className={styles.header}>
        <span className={`${styles.priority} ${styles[task.priority]}`}>
          {task.priority}
        </span>

        <GripVertical size={16} className={styles.grip} />
      </div>

      <h4>{task.title}</h4>

      <p>{task.description}</p>

      <div className={styles.footer}>
        <div className={styles.avatar}>{task.assignee[0]}</div>

        <div className={styles.date}>
          <CalendarDays size={14} />

          {task.dueDate}
        </div>
      </div>
    </motion.article>
  );
}
