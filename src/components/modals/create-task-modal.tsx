"use client";

import { useState } from "react";

import { X } from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

import { toast } from "sonner";

import { useProjectStore } from "@/store/project-store";

import styles from "./create-task-modal.module.css";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function CreateTaskModal({ open, onClose }: Props) {
  const createTask = useProjectStore((state) => state.createTask);

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  function handleCreate() {
    if (!title) {
      toast.error("Task title required");

      return;
    }

    createTask({
      title,
      description,
      assignee: "Leonardo",
      priority: "medium",
      status: "backlog",
      dueDate: "Tomorrow",
    });

    toast.success("Task created successfully");

    onClose();

    setTitle("");
    setDescription("");
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className={styles.overlay}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
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
            }}
          >
            <div className={styles.header}>
              <h2>Create Task</h2>

              <button onClick={onClose}>
                <X size={18} />
              </button>
            </div>

            <div className={styles.form}>
              <input
                placeholder="Task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <button className={styles.submit} onClick={handleCreate}>
              Create Task
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
