import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useTasks } from "../../hooks/useTasks";
import { useUsers, type User } from "../../context/UserContext";

const taskSchema = z.object({
  title: z.string().min(3, "Le titre doit contenir au moins 3 caractères"),
  description: z.string().optional(),
  status: z.enum(["todo", "in-progress", "done"]),
  priority: z.enum(["low", "medium", "high"]),
  assigned_to: z.string().min(1, "Le champ assigné à est obligatoire"),
  due_date: z.string().min(1, "La date est obligatoire"),
});

type TaskFormData = z.infer<typeof taskSchema>;

export default function TaskForm() {
  const { createTask, updateTask, currentTask, setCurrentTask } = useTasks();
  const { users } = useUsers();
  const [apiErrors, setApiErrors] = useState<Record<string, string[]>>({});

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      status: "todo",
      priority: "medium",
    },
  });

  useEffect(() => {
    if (currentTask) {
      reset({
        title: currentTask.title,
        description: currentTask.description || "",
        status:
          currentTask.status === "À faire"
            ? "todo"
            : currentTask.status === "En cours"
              ? "in-progress"
              : "done",
        priority:
          currentTask.priority === "Faible"
            ? "low"
            : currentTask.priority === "Moyenne"
              ? "medium"
              : "high",
        assigned_to: String(currentTask.assigned_user.id),
        due_date: currentTask.due_date.split(" ")[0], // YYYY-MM-DD
      });
    } else {
      reset({
        status: "todo",
        priority: "medium",
        assigned_to: "",
      });
    }
  }, [currentTask, reset]);

  const onSubmit = async (data: TaskFormData) => {
    try {
      setApiErrors({});
      if (currentTask) {
        await updateTask(currentTask.id, data);
      } else {
        await createTask(data);
      }
      reset();
      setCurrentTask(null); // vider le formulaire après update
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response?.data?.errors) {
        setApiErrors(error.response.data.errors);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded shadow mb-6 space-y-4"
    >
      <h3 className="text-xl text-primary font-semibold">
        {currentTask ? "Modifier la tâche" : "Nouvelle tâche"}
      </h3>

      {/* Title */}
      <div>
        <input
          {...register("title")}
          placeholder="Titre"
          className={`w-full p-2 border rounded ${
            errors.title ? "border-red-500" : ""
          }`}
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <input
          {...register("description")}
          placeholder="Description"
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Status */}
      <select {...register("status")} className="w-full p-2 border rounded">
        <option value="todo">À faire</option>
        <option value="in-progress">En cours</option>
        <option value="done">Terminée</option>
      </select>

      {/* Priority */}
      <div>
        <select {...register("priority")} className="w-full p-2 border rounded">
          <option value="low">Faible</option>
          <option value="medium">Moyenne</option>
          <option value="high">Élevée</option>
        </select>
      </div>

      {/* Assigned To */}
      <div>
        <select
          {...register("assigned_to")}
          className={`w-full p-2 border rounded ${
            errors.assigned_to ? "border-red-500" : ""
          }`}
        >
          <option value="">Sélectionner un utilisateur</option>
          {users.map((user: User) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        {errors.assigned_to && (
          <p className="text-red-500 text-sm">{errors.assigned_to.message}</p>
        )}
        {apiErrors.assigned_to && (
          <p className="text-red-500 text-sm">{apiErrors.assigned_to[0]}</p>
        )}
      </div>

      {/* Due Date */}
      <div>
        <input
          type="date"
          {...register("due_date")}
          className={`w-full p-2 border rounded ${
            errors.due_date ? "border-red-500" : ""
          }`}
        />
        {errors.due_date && (
          <p className="text-red-500 text-sm">{errors.due_date.message}</p>
        )}
        {apiErrors.due_date && (
          <p className="text-red-500 text-sm">{apiErrors.due_date[0]}</p>
        )}
      </div>

      <button className="bg-primary text-white px-4 py-2 rounded w-full">
        {currentTask ? "Mettre à jour" : "Ajouter la tâche"}
      </button>
    </form>
  );
}
