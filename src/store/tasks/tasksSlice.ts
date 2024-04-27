import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Task {
  id?: any;
  title?: string;
  description?: string;
  date?: any;
  done?: boolean;
}

interface TasksState {
  tasks: Task[];
  deletedTasks: Task[];
}

const initialState: TasksState = {
  tasks: [],
  deletedTasks: [],
};

const tasksStateFromLocalStorage = localStorage.getItem("tasksState");
if (tasksStateFromLocalStorage) {
  try {
    const parsedState: TasksState = JSON.parse(tasksStateFromLocalStorage);
    initialState.tasks = parsedState.tasks || [];
    initialState.deletedTasks = parsedState.deletedTasks || [];
  } catch (error) {
    console.error("Error parsing tasks state from localStorage:", error);
  }
}

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<{ id: any; done: boolean }>) => {
      const { id, done } = action.payload;
      const taskToUpdate = state.tasks.find((task) => task.id === id);
      if (taskToUpdate) {
        taskToUpdate.done = done;
      }
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      const taskId = action.payload;
      const deletedTask = state.tasks.find((task) => task.id === taskId);
      if (deletedTask) {
        state.deletedTasks.push(deletedTask);
        state.tasks = state.tasks.filter((task) => task.id !== taskId);
      }
    },
  },
});

export const { addTask, updateTask, deleteTask } = tasksSlice.actions;

export default tasksSlice.reducer;
