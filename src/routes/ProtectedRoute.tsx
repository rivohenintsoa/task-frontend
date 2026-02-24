import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({ children }: any) {
  const { user } = useAuth();
  
  if (!user && !localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }
  return children;
}