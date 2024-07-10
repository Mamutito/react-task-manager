import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { taskListType, taskType } from "../types";

export const defaultTaskList: taskListType = {
  id: "",
  title: "Type your task title...",
  tasks: [],
  editMode: true,
};

export const defaultTask: taskType = {
  id: "",
  title: "Type your action...",
  description: "Type your action description...",
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
  },
});

export const {
  addTemporaryTaskList,
  setTaskList,
  updateTaskList,
  removeTemporaryTaskList,
} = tasksSlice.actions;

export default tasksSlice.reducer;
