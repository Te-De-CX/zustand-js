import React from "react";
import TodoList from "./components/TodoList";
import useThemeStore from "./store/themeStore";

const App: React.FC = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <div className={theme}>
      <button onClick={toggleTheme}>
        Switch to {theme === "light" ? "Dark" : "Light"} Mode
      </button>
      <h1>Zustand Todo App</h1>
      <TodoList />
    </div>
  );
};

export default App;