import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { TaskProvider } from "./context/TaskContext";
import { UserProvider } from "./context/UserContext";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TaskProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <UserProvider>
                    <DashboardPage />
                  </UserProvider>
                </ProtectedRoute>
              }
            />
          </Routes>
        </TaskProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
