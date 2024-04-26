import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasksSlice";
import modalReducer from "./openModal/openModalSlice";

const saveToLocalStorage = (store: any) => (next: any) => (action: any) => {
  const result = next(action);
  localStorage.setItem("tasksState", JSON.stringify(store.getState().tasks));
  return result;
};

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saveToLocalStorage),
    
});

export type RootState = ReturnType<typeof store.getState>;
