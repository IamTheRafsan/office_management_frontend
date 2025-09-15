import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

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
    try {
      // Call server logout
      await axios.post(
        "http://localhost:3001/hr/logout",
        {},
        { withCredentials: true }
      );

      // Remove the token cookie on client
      Cookies.remove("token");

      // Optional: remove all cookies
      document.cookie
        .split(";")
        .forEach(
          (c) =>
            (document.cookie = c
              .replace(/^ +/, "")
              .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`))
        );

      setIsAuthenticated(false);
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return { isAuthenticated, logout };
}
