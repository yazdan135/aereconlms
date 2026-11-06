import React, { createContext, useState, useEffect, useContext } from "react";

export type Role =
  | "SUPER_ADMIN"
  | "ADMIN"
  | "FINANCE"
  | "ACADEMIC"
  | "OPERATION"
  | "INSTRUCTOR"
  | "STUDENT";

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: Role;
}

interface AuthCtx {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthCtx | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  // Load persisted session on mount
  useEffect(() => {
    const stored = localStorage.getItem("auth:user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = async (email: string, password: string) => {
    // ----- Mock validation -----
    const mockUsers: User[] = [
      {
        id: "1",
        email: "super@aerecon.com",
        fullName: "Super Admin",
        role: "SUPER_ADMIN",
      },
      {
        id: "2",
        email: "admin@aerecon.com",
        fullName: "Admin User",
        role: "ADMIN",
      },
      {
        id: "3",
        email: "finance@aerecon.com",
        fullName: "Finance Manager",
        role: "FINANCE",
      },
      {
        id: "4",
        email: "academic@aerecon.com",
        fullName: "Academic Manager",
        role: "ACADEMIC",
      },
      {
        id: "5",
        email: "op@aerecon.com",
        fullName: "Operations Manager",
        role: "OPERATION",
      },
      {
        id: "6",
        email: "instr@aerecon.com",
        fullName: "Instructor",
        role: "INSTRUCTOR",
      },
      {
        id: "7",
        email: "student@aerecon.com",
        fullName: "Student One",
        role: "STUDENT",
      },
    ];
    const found = mockUsers.find((u) => u.email === email);
    if (!found) throw new Error("User not found");
    // In a real app, verify password here
    setUser(found);
    localStorage.setItem("auth:user", JSON.stringify(found));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth:user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

