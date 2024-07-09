import { createSlice } from "@reduxjs/toolkit";
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
  currentTasks: taskListType[];
}

const initialState: tasksSliceType = {
  currentTasks: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTaskList: (state, action) => {
      state.currentTasks[action.payload.id] = action.payload.taskList;
    },
    addTaskList: (state) => {
      state.currentTasks.push({
        ...defaultTaskList,
        id: state.currentTasks.length.toString(),
      });
    },
  },
});

export const { addTaskList, setTaskList } = tasksSlice.actions;

export default tasksSlice.reducer;
