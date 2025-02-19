import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define the theme state type
interface ThemeState {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

// Create the Zustand store with persistence
const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "light", // Default theme
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        })),
    }),
    { name: "theme-storage" } // Persist in localStorage
  )
);

export default useThemeStore;