import { useState, useEffect } from "react";
import axios from "axios";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("http://localhost:3001/hr/me", {
          withCredentials: true,
        });
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  const logout = async () => {
    await axios.post(
      "http://localhost:3001/hr/logout",
      {},
      { withCredentials: true }
    );
    setIsAuthenticated(false);
  };

  return { isAuthenticated, logout };
}
