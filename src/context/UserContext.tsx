// src/context/UserContext.tsx
import { createContext, useState, useEffect, useContext } from "react";
import type { ReactNode } from "react";
import api from "../api/taskApi";

export type User = {
  id: number;
  name: string;
  email?: string;
  role?: string;
};

type UserContextType = {
  users: User[];
  fetchUsers: () => Promise<void>;
};

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data.data);
    } catch (error) {
      console.error("Erreur lors du fetch des utilisateurs", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider value={{ users, fetchUsers }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUsers doit être utilisé à l'intérieur d'un UserProvider");
  }
  return context;
};