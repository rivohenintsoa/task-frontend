import { useEffect, useState } from "react";
import { useTasks } from "../../hooks/useTasks";

export default function TaskTable() {
  const { tasks, fetchTasks, deleteTask, setCurrentTask } = useTasks();

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadTasks = async (page: number) => {
    setLoading(true);
    try {
      const res = await fetchTasks({ page });
      if (res?.meta?.last_page) setLastPage(res.meta.last_page);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks(currentPage);
  }, [currentPage]);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  const handleNext = () => {
    if (currentPage < lastPage) setCurrentPage((p) => p + 1);
  };

  const handleDelete = async (id: number) => {
    await deleteTask(id);
    loadTasks(currentPage);
  };

  return (
    <>
      {/* MOBILE VIEW (Cards) */}
      <div className="md:hidden space-y-4">
        {loading ? (
          <div className="text-center p-4 bg-white rounded shadow">
            Chargement...
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center p-4 bg-white rounded shadow">
            Aucune tâche
          </div>
        ) : (
          tasks.map((task: any) => (
            <div
              key={task.id}
              className="bg-white p-4 rounded-xl shadow space-y-2"
            >
              <div className="font-semibold text-lg">{task.title}</div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Status:</span>
                <span>{task.status}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Priorité:</span>
                <span>{task.priority}</span>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setCurrentTask(task)}
                  className="flex-1 bg-yellow-500 text-white py-2 rounded"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="flex-1 bg-accent text-white py-2 rounded"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* DESKTOP VIEW (Table) */}
      <div className="hidden md:block bg-white p-3">
        <table className="w-full shadow rounded">
          <thead className="bg-primary">
            <tr>
              <th className="p-2">Titre</th> <th>Status</th> <th>Priorité</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="text-center p-4">
                  Chargement...
                </td>
              </tr>
            ) : tasks.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center p-4">
                  Aucune tâche
                </td>
              </tr>
            ) : (
              tasks.map((task: any) => (
                <tr key={task.id} className="border-t text-center">
                  <td className="p-2">{task.title}</td> <td>{task.status}</td>
                  <td>{task.priority}</td>
                  <td className="text-right">
                    <button
                      onClick={() => setCurrentTask(task)}
                      className="bg-yellow-500 text-white px-3 py-1 my-1 rounded mr-2"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="bg-accent text-white px-3 py-1 my-1 rounded md:mr-3"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4 gap-2">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Précédent
        </button>

        {[...Array(lastPage)].map((_, i) => {
          const pageNum = i + 1;
          return (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`px-3 py-1 rounded ${
                pageNum === currentPage
                  ? "bg-primary text-white"
                  : "bg-gray-200"
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          onClick={handleNext}
          disabled={currentPage === lastPage}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Suivant
        </button>
      </div>
    </>
  );
}
