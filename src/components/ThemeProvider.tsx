"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { ColorOption, colors } from "@/utils/colors";

type Mode = "light" | "dark";

type ThemeContextType = {
  mode: Mode;
  color: ColorOption;
  toggleMode: () => void;
  setColor: (color: ColorOption) => void;
  mounted: boolean;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const DEFAULT_COLOR: ColorOption = "sky";

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<Mode>("light");
  const [color, setColorState] = useState<ColorOption>(DEFAULT_COLOR);

  const applyTheme = (newMode: Mode, newColor: ColorOption) => {
    const root = document.documentElement;
    colors.forEach((c) => {
      root.classList.remove(`theme-${c}`);
    });
    root.classList.remove("light", "dark");
    root.classList.add(newMode);
    root.classList.add(`theme-${newColor}`);
  };

  const savePreferences = (newMode: Mode, newColor: ColorOption) => {
    try {
      localStorage.setItem("theme-mode", newMode);
      localStorage.setItem("theme-color", newColor);
    } catch (e) {
      console.error("Failed to save theme preferences", e);
    }
  };

  useEffect(() => {
    setMounted(true);

    try {
      const storedMode = localStorage.getItem("theme-mode") as Mode | null;
      const storedColor = localStorage.getItem("theme-color") as ColorOption | null;
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initialMode = storedMode || (prefersDark ? "dark" : "light");
      const initialColor = storedColor || DEFAULT_COLOR;

      setMode(initialMode);
      setColorState(initialColor);
      applyTheme(initialMode, initialColor);
    } catch (e) {
      console.error("Error initializing theme", e);
    }
  }, []);

  const toggleMode = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    savePreferences(newMode, color);
    applyTheme(newMode, color);
  };

  const setColor = (newColor: ColorOption) => {
    setColorState(newColor);
    savePreferences(mode, newColor);
    applyTheme(mode, newColor);
  };

  return (
    <ThemeContext.Provider value={{ mode, color, toggleMode, setColor, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
