"use client";
import { useState, useEffect } from "react";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      setIsAuthenticated(!!token);
    };

    checkAuth();

    // Optional: Check auth status periodically or on storage events
    const interval = setInterval(checkAuth, 1000); // Check every second
    return () => clearInterval(interval);
  }, []);

  const logout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
    setIsAuthenticated(false);
  };

  return { isAuthenticated, logout };
};
