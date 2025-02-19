import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserRole = "user" | "admin";

interface User {
  id: number;
  username: string;
  role: UserRole;
  token: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAdmin: () => boolean;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      loading: false,

      login: async (username, password) => {
        set({ loading: true });

        try {
          await new Promise((resolve) => setTimeout(resolve, 1000));

          const fakeUser: User = {
            id: 1,
            username,
            role: username === "admin" ? "admin" : "user",
            token: "fake-jwt-token",
          };

          set({ user: fakeUser, loading: false });
        } catch (error) {
          console.error("Login failed:", error);
          set({ loading: false });
        }
      },

      logout: () => set({ user: null }),

      isAdmin: () => get().user?.role === "admin",
    }),
    { name: "auth-storage" }
  )
);

export default useAuthStore;