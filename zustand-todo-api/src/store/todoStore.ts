import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define a Todo type
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// Define possible filter values
export type Filter = "all" | "completed" | "pending";

// Define the state type
interface TodoState {
  todos: Todo[];
  filter: Filter;
  loading: boolean; // New loading state
  fetchTodos: () => Promise<void>;
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  setFilter: (filter: Filter) => void;
}

// Create Zustand store with persistence
const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({
      todos: [],
      filter: "all",
      loading: false, // Default loading state

      fetchTodos: async () => {
        set({ loading: true }); // Start loading
        try {
          const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");
          const data: Todo[] = await response.json();
          set({
            todos: data.map((todo) => ({
              id: todo.id,
              text: todo.title,
              completed: todo.completed,
            })),
            loading: false, // Stop loading after fetching
          });
        } catch (error) {
          console.error("Failed to fetch todos:", error);
          set({ loading: false }); // Stop loading even if there's an error
        }
      },

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

      setFilter: (filter) => set({ filter }),
    }),
    { name: "todo-storage" }
  )
);

export default useTodoStore;