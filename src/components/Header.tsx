"use client";
import { Sun, Moon, Palette, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";
import { colors } from "@/utils/colors";

export function Header() {
  const { mode, color, toggleMode, setColor, mounted } = useTheme();
  const [showColorPicker, setShowColorPicker] = useState(false);
  const colorPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target as Node)) {
        setShowColorPicker(false);
      }
    };

    if (showColorPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showColorPicker]);

  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 w-full h-16 flex items-center justify-between">
        <div className="invisible">Loading...</div>
      </header>
    );
  }

  return (
    <header
      className={`fixed top-0 left-0 w-full h-16 flex items-center justify-between border-b-2 ${
        mode === "dark" ? `bg-${color}-800` : `bg-${color}-200`
      }`}
    >
      <div className="mx-3">
        <h1 className="text-2xl font-bold">Template</h1>
      </div>
      <div className="flex items-center space-x-4 relative">
        {/* Palette */}
        <button
          onClick={() => setShowColorPicker(!showColorPicker)}
          className={`p-2 rounded-full hover:bg-${color}-200 dark:hover:bg-${color}-800`}
          aria-label="Change theme color"
        >
          <Palette className={"cursor-pointer font-bold"} />
        </button>

        {/* Color selector */}
        {showColorPicker && (
          <div
            ref={colorPickerRef}
            className={`absolute top-[50px] w-[135px] right-0 rounded shadow-lg p-3 grid grid-cols-4 gap-2 border border-gray-200 dark:border-gray-700 ${
              mode === "dark" ? `bg-${color}-900` : `bg-${color}-100`
            }`}
          >
            <div className="col-span-3">
              <p className="text-center capitalize">{color}</p>
            </div>
            <div
              className="cursor-pointer"
              onClick={() => {
                setShowColorPicker(false);
              }}
            >
              <X />
            </div>
            {colors.map((colorOption) => (
              <div
                key={colorOption}
                onClick={() => {
                  setColor(colorOption);
                  setShowColorPicker(false);
                }}
                className={`w-8 h-8 rounded-full bg-${colorOption}-500 cursor-pointer ${
                  color === colorOption ? "ring-2" : ""
                }`}
                aria-label={`${colorOption} theme`}
              />
            ))}
          </div>
        )}

        {/* Button to toggle light/dark mode */}
        <button
          onClick={toggleMode}
          className={`p-2 rounded-full cursor-pointer`}
          aria-label={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          {mode === "dark" ? <Sun className="font-bold" /> : <Moon className="font-bold" />}
        </button>
      </div>
    </header>
  );
}
