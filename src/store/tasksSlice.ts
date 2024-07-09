import { createSlice } from "@reduxjs/toolkit";
import { taskListType, taskType } from "../types";

export const defaultTaskList: taskListType = {
  id: "",
  title: "Type your task title...",
  tasks: [],
};

export const defaultTask: taskType = {
  id: "",
  title: "Type your action...",
  description: "Type your action description...",
};

interface tasksSliceType {
  currentTasks: taskListType;
}

const initialState: tasksSliceType = {
  currentTasks: defaultTaskList,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTaskList: (state, action) => {},
    addTaskList: (state, action) => {},
  },
});

export const { addTaskList, setTaskList } = tasksSlice.actions;

export default tasksSlice.reducer;
