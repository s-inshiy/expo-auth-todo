import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';

import { Task } from '@/types/Common';

// Define the shape of the state
interface TasksState {
  tasks: Task[];
  selectedTask: Task | null;
}

// Define different action types that can be dispatched
type Action =
  | { type: 'tasks/received'; payload: Task[] }
  | { type: 'task/created'; payload: Task }
  | { type: 'task/updated'; payload: Task }
  | { type: 'task/deleted'; payload: Task }
  | { type: 'task/selected'; payload: Task };

const STORAGE_KEY = '@expo-auth-todo:tasks';

// Function to store tasks in AsyncStorage
const storeTasks = async (tasks: Task[]): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(tasks);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (e) {
    console.log(e);
    // Handle saving error
  }
};

// Function to get tasks from AsyncStorage
const getTasks = async (): Promise<Task[] | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
    // Handle error reading value
    return null;
  }
};

// Define the type for the context
type TasksContextType = {
  tasks: Task[];
  selectedTask: Task | null;
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (task: Task) => void;
  selectTask: (task: Task) => void;
};

// Create a context to hold tasks-related state and actions
const TasksContext = createContext<TasksContextType | null>(null);

const initialState: TasksState = {
  tasks: [],
  selectedTask: null,
};

function reducer(state: TasksState, action: Action): TasksState {
  switch (action.type) {
    case 'tasks/received':
      return {
        ...state,
        tasks: action.payload,
      };
    case 'task/created':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case 'task/updated':
      return {
        ...state,
        tasks: state.tasks.map((task) => (task.id === action.payload.id ? action.payload : task)),
        selectedTask: null,
      };
    case 'task/deleted':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload.id),
      };
    case 'task/selected':
      return {
        ...state,
        selectedTask: action.payload,
      };
    default:
      return state; // Return the current state for unknown actions
  }
}

interface TasksProviderProps {
  children: ReactNode;
}

// The main provider component that wraps the application and provides state and actions
function TasksProvider({ children }: TasksProviderProps): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // Fetch tasks from storage when the component mounts
    async function fetchTasks() {
      const tasks = await getTasks();
      if (tasks !== null) {
        // Dispatch an action to update the state with fetched tasks
        dispatch({ type: 'tasks/received', payload: tasks });
      }
    }
    fetchTasks();
  }, []);

  // Define action functions that modify state and update storage
  function addTask(task: Task) {
    dispatch({
      type: 'task/created',
      payload: task,
    });
    storeTasks([...state.tasks, task]); // Update the stored tasks
  }

  function updateTask(task: Task) {
    dispatch({
      type: 'task/updated',
      payload: task,
    });
    const updatedTasks = state.tasks.map((existingTask) =>
      existingTask.id === task.id ? task : existingTask
    );
    storeTasks(updatedTasks);
  }

  function deleteTask(task: Task) {
    dispatch({
      type: 'task/deleted',
      payload: task,
    });
    const updatedTasks = state.tasks.filter((existingTask) => existingTask.id !== task.id);
    storeTasks(updatedTasks);
  }

  function selectTask(task: Task) {
    dispatch({
      type: 'task/selected',
      payload: task,
    });
  }

  // Provide state and action functions to components via context
  return (
    <TasksContext.Provider
      value={{
        tasks: state?.tasks,
        selectedTask: state?.selectedTask,
        addTask,
        updateTask,
        deleteTask,
        selectTask,
      }}>
      {children}
    </TasksContext.Provider>
  );
}

// Custom hook to conveniently access tasks-related context
function useTasks(): TasksContextType {
  const context = useContext(TasksContext);

  if (context === null) throw new Error('useTasks must be used within a TasksProvider');

  return context;
}

export { TasksProvider, useTasks, TasksContext };
