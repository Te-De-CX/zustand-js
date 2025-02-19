import { create } from "zustand";
import { persist } from "zustand/middleware";
import useAuthStore from "./authStore";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export type Filter = "all" | "completed" | "pending";

interface TodoState {
  todos: Todo[];
  filter: Filter;
  loading: boolean;
  fetchTodos: () => Promise<void>;
  addTodo: (text: string) => Promise<void>;
  toggleTodo: (id: number) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
  setFilter: (filter: Filter) => void;
}

const useTodoStore = create<TodoState>()(
  persist(
    (set, get) => ({
      todos: [],
      filter: "all",
      loading: false,

      fetchTodos: async () => {
        set({ loading: true });
        const { user } = useAuthStore.getState(); // Access auth store state
        if (!user) return;

        try {
          const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5", {
            headers: { Authorization: `Bearer ${user.token}` }, // Fixed template literal
          });
          const data: Todo[] = await response.json();
          set({ todos: data.map((t) => ({ id: t.id, text: t.title, completed: t.completed })), loading: false });
        } catch (error) {
          console.error("Error fetching todos:", error);
          set({ loading: false });
        }
      },

      addTodo: async (text) => {
        if (!text.trim()) return;
        const { user } = useAuthStore.getState(); // Access auth store state
        if (!user) return;

        try {
          const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`, // Fixed template literal
            },
            body: JSON.stringify({ title: text, completed: false }),
          });
          const newTodo: Todo = await response.json();
          set((state) => ({ todos: [...state.todos, { id: newTodo.id, text, completed: false }] }));
        } catch (error) {
          console.error("Error adding todo:", error);
        }
      },

      toggleTodo: async (id) => {
        const { user } = useAuthStore.getState(); // Access auth store state
        if (!user) return;
        const todo = get().todos.find((t) => t.id === id);
        if (!todo) return;

        try {
          await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, { // Fixed template literal
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`, // Fixed template literal
            },
            body: JSON.stringify({ completed: !todo.completed }),
          });
          set((state) => ({
            todos: state.todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
          }));
        } catch (error) {
          console.error("Error updating todo:", error);
        }
      },

      deleteTodo: async (id) => {
        const { user } = useAuthStore.getState(); // Access auth store state
        if (!user) return;

        try {
          await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, { // Fixed template literal
            method: "DELETE",
            headers: { Authorization: `Bearer ${user.token}` }, // Fixed template literal
          });

          set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) }));
        } catch (error) {
          console.error("Error deleting todo:", error);
        }
      },

      setFilter: (filter) => set({ filter }),
    }),
    { name: "todo-storage" }
  )
);

export default useTodoStore;