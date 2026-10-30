/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useReducer } from "react";
import { loadTasks, saveTasks } from "../utils/localstorage";

const TasksStateContext = createContext(null);
const TasksDispatchContext = createContext(null);

// Array of tasks: { id, title, description, priority, dueDate, status }
const initialState = [];

function tasksReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "EDIT":
      return state.map((task) =>
        task.id === action.payload.id ? { ...task, ...action.payload } : task,
      );
    case "DELETE":
      return state.filter((task) => task.id !== action.payload);
    case "MOVE":
      return state.map((task) =>
        task.id === action.payload.id
          ? { ...task, status: action.payload.status }
          : task,
      );
    default:
      throw new Error(`Unknown Action: ${action.type}`);
  }
}

export const TasksProvider = ({ children }) => {
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    initialState,
    loadTasks,
  );

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  return (
    <TasksStateContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksStateContext.Provider>
  );
};

export function useTasksState() {
  const context = useContext(TasksStateContext);
  if (context === null) {
    throw new Error("useTasksState must be used inside <TasksProvider>");
  }
  return context;
}

export function useTasksDispatch() {
  const context = useContext(TasksDispatchContext);
  if (context === null) {
    throw new Error("useTasksDispatch must be used inside <TasksProvider>");
  }
  return context;
}
