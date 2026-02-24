import { useTasks } from "../../hooks/useTasks";

export default function TaskFilters() {
  const { fetchTasks } = useTasks();

  return (
    <div className="flex w-full justify-between md:justify-end md:gap-3">
      <select
        onChange={(e) => fetchTasks({ status: e.target.value })}
        className="p-2 border rounded"
      >
        <option value="">Tous les statuts</option>
        <option value="todo">À faire</option>
        <option value="in-progress">En cours</option>
        <option value="done">Terminée</option>
      </select>

      <select
        onChange={(e) => fetchTasks({ priority: e.target.value })}
        className="p-2 border rounded"
      >
        <option value="">Toutes priorités</option>
        <option value="low">Faible</option>
        <option value="medium">Moyenne</option>
        <option value="high">Élevée</option>
      </select>
    </div>
  );
}
