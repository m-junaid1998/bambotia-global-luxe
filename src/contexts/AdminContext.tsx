import { createContext, useContext, useEffect, useState, ReactNode } from "react";

const ADMIN_EMAIL = "admin@bambotia.com";
const ADMIN_PASSWORD = "admin123";
const STORAGE_KEY = "bambotia_admin_session";

interface AdminContextValue {
  isAuthenticated: boolean;
  login: (email: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
}

const AdminContext = createContext<AdminContextValue | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem(STORAGE_KEY) === "true");
  }, []);

  const login = (email: string, password: string) => {
    if (email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem(STORAGE_KEY, "true");
      setIsAuthenticated(true);
      return { ok: true };
    }
    return { ok: false, error: "Invalid admin credentials" };
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setIsAuthenticated(false);
  };

  return (
    <AdminContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
};

export const ADMIN_DEMO_CREDENTIALS = { email: ADMIN_EMAIL, password: ADMIN_PASSWORD };
