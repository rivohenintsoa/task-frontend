import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import TaskForm from "../components/TaskForm/TaskForm";
import TaskTable from "../components/Dashboard/TaskTable";
import TaskFilters from "../components/Dashboard/TaskFilters";
import SearchInput from "../components/Dashboard/SearchInput";

export default function DashboardPage() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Erreur logout:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="md:flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl text-primary">Dashboard</h1>
          <p className="text-sm text-gray-600">Bienvenue {user?.name}</p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-accent text-white px-4 py-2 rounded"
        >
          Déconnexion
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5">
        <TaskForm />
        <div className="col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5 justify-center items-center bg-white p-5">
            <div>
              <SearchInput />
            </div>
            <div className="my-3 flex mx-auto w-full">
              <TaskFilters />
            </div>
          </div>
          <TaskTable />
        </div>
      </div>
    </div>
  );
}
