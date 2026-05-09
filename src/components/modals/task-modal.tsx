"use client";

import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Task } from "@/types/task";

import styles from "./task-modal.module.css";

type Props = {
  open: boolean;
  onClose: () => void;
  task: Task | null;
};

export function TaskModal({ open, onClose, task }: Props) {
  return (
    <AnimatePresence>
      {open && task && (
        <>
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className={styles.modal}
            initial={{
              opacity: 0,
              y: 40,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 20,
              scale: 0.98,
            }}
          >
            <div className={styles.header}>
              <div>
                <span className={styles.badge}>{task.priority}</span>

                <h2>{task.title}</h2>
              </div>

              <button onClick={onClose}>
                <X size={18} />
              </button>
            </div>

            <p className={styles.description}>{task.description}</p>

            <div className={styles.grid}>
              <div className={styles.block}>
                <span>Assignee</span>
                <strong>{task.assignee}</strong>
              </div>

              <div className={styles.block}>
                <span>Status</span>
                <strong>{task.status}</strong>
              </div>

              <div className={styles.block}>
                <span>Due date</span>
                <strong>{task.dueDate}</strong>
              </div>

              <div className={styles.block}>
                <span>Sprint</span>
                <strong>Q2 Sprint 12</strong>
              </div>
            </div>

            <div className={styles.section}>
              <h3>AI Operational Notes</h3>

              <div className={styles.note}>Delivery risk remains low.</div>

              <div className={styles.note}>Backend dependency detected.</div>

              <div className={styles.note}>
                Estimated completion within sprint.
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
