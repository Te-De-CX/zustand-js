//using zustand with react stores
import React,{ createContext, useContext } from "react";
import useCounterStore from "./store/counterStore";
import useAuthStore from "./store/authStore";

const StoreContext = createContext();

export const StoreProvider =({ children }) => {
    const counterStore = useCounterStore();
    const authStore = useAuthStore();

    return(
        <StoreContext.Provider value={{ counterStore, authStore }} >
            {children}
        </StoreContext.Provider>
    )
}

export const useStore = () => useContext(StoreContext);