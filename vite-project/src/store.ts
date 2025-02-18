import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

// Define the type for the store's state and actions
interface CounterState {
  count: number;
  increase: () => void;
  decrease: () => void;
  reset: () => void;
}

// Create the store with TypeScript types
const useStore = create<CounterState>()(
  devtools(
    persist(
      (set) => ({
        count: 0,
        increase: () =>
          set((state) => ({
            count: state.count + 1,
          })),
        decrease: () =>
          set((state) => ({
            count: state.count - 1,
          })),
        reset: () => set({ count: 0 }),
      }),
      { name: "counter-storage" } ///store it in the local storage with this name, that was why we used persist
    )
  )
);

export default useStore;