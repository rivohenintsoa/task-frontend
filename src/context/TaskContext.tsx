import { createContext, useState } from "react";
import type { ReactNode } from "react";
import api from "../api/taskApi";

export const TaskContext = createContext<any>(null);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [currentTask, setCurrentTask] = useState<any>(null);

  const fetchTasks = async (params = {}) => {
    const res = await api.get("/tasks", { params });
    setTasks(res.data.data);
    return res.data; 
  };

  const createTask = async (data: any) => {
    const res = await api.post("/tasks", data);
    setTasks((prev) => [res.data.data, ...prev]);
  };

  const updateTask = async (id: number, data: any) => {
    const res = await api.put(`/tasks/${id}`, data);
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? res.data.data : t))
    );
  };

  const deleteTask = async (id: number) => {
    await api.delete(`/tasks/${id}`);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <TaskContext.Provider
      value={{ tasks, currentTask, setCurrentTask, fetchTasks, createTask, updateTask, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};