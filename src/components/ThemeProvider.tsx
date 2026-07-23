"use client";
import { useEffect, useState, createContext, useContext, ReactNode } from "react";
interface ThemeProviderProps {
  children: ReactNode;
}

type Theme = "light" | "dark";

const ThemeContext = createContext<{ theme: Theme; setTheme: (t: Theme) => void } | undefined>(undefined);

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>("light");

  // Initialize from localStorage or system preference
  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    if (saved) {
      setTheme(saved);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  }, []);

  // Apply class to html element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
