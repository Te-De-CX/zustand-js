import React from "react";
import useAuthStore from "./store/authStore";
import TodoList from "./components/TodoList";
import Login from "./components/Login";

const App: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <div>
      <h1>Todo App with Zustand</h1>
      <Login />
      {user && <TodoList />}
    </div>
  );
};

export default App;