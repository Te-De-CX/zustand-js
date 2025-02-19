import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define a Todo type
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// Define possible filter values
type Filter = "all" | "completed" | "pending";

// Define the state type
interface TodoState {
  todos: Todo[];
  filter: Filter;
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  setFilter: (filter: Filter) => void;
}

// Create the Zustand store with persistence
const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({
      todos: [],
      filter: "all", // Default filter
      addTodo: (text) =>
        set((state) => ({
          todos: [...state.todos, { id: Date.now(), text, completed: false }],
        })),
      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        })),
      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
      setFilter: (filter) => set({ filter }), // Function to update filter
    }),
    { name: "todo-storage" } // Persist in localStorage
  )
);

export default useTodoStore;