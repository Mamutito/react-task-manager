import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { taskListType, taskType } from "../types";

export const defaultTaskList: taskListType = {
  id: "",
  title: "",
  tasks: [],
  editMode: true,
};

export const defaultTask: taskType = {
  id: "",
  title: "",
  description: "",
  editMode: true,
  collapsed: false,
};

interface tasksSliceType {
  currentTasksList: taskListType[];
  temporaryTasksList: taskListType[];
}

const initialState: tasksSliceType = {
  currentTasksList: [],
  temporaryTasksList: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTaskList: (state, action: PayloadAction<taskListType[]>) => {
      state.currentTasksList = action.payload;
    },
    updateTaskList: (state, action: PayloadAction<taskListType>) => {
      const taskListIndex = state.currentTasksList.findIndex(
        (taskList) => taskList.id === action.payload.id
      );
      if (taskListIndex !== -1) {
        state.currentTasksList[taskListIndex] = action.payload;
      } else {
        state.currentTasksList.push(action.payload);
      }
    },
    addTemporaryTaskList: (state) => {
      state.temporaryTasksList.push({
        ...defaultTaskList,
        id: state.temporaryTasksList.length.toString(),
      });
    },
    removeTemporaryTaskList: (state, action: PayloadAction<string>) => {
      state.temporaryTasksList = state.temporaryTasksList.filter(
        (taskList) => taskList.id !== action.payload
      );
    },
    deleteTaskList: (state, action: PayloadAction<string>) => {
      state.currentTasksList = state.currentTasksList.filter(
        (taskList) => taskList.id !== action.payload
      );
    },
    addTask: (state, action: PayloadAction<string>) => {
      const taskListIndex = state.currentTasksList.findIndex(
        (taskList) => taskList.id === action.payload
      );
      if (taskListIndex !== -1) {
        const tasks = state.currentTasksList[taskListIndex].tasks;
        tasks.push({
          ...defaultTask,
          id: tasks.length.toString(),
        });
      } else {
        return state;
      }
    },
    updateTask: (
      state,
      action: PayloadAction<{ task: taskType; listId: string; newId?: string }>
    ) => {
      const taskListIndex = state.currentTasksList.findIndex(
        (taskList) => taskList.id === action.payload.listId
      );
      if (taskListIndex !== -1) {
        const tasks = state.currentTasksList[taskListIndex].tasks;
        const tasksIndex = tasks.findIndex(
          (task) => task.id === action.payload.task.id
        );
        if (tasksIndex !== -1) {
          tasks[tasksIndex] = {
            ...action.payload.task,
            id: action.payload.newId || action.payload.task.id,
          };
        } else {
          return state;
        }
      } else {
        return state;
      }
    },
  },
});

export const {
  addTemporaryTaskList,
  setTaskList,
  updateTaskList,
  removeTemporaryTaskList,
  deleteTaskList,
  addTask,
  updateTask,
} = tasksSlice.actions;

export default tasksSlice.reducer;
