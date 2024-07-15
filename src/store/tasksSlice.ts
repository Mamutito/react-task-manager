import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { taskListType, taskType } from "../types";

const findTaskListAndTasks = (taskLists: taskListType[], listId: string) => {
  const taskListIndex = taskLists.findIndex(
    (taskList) => taskList.id === listId
  );
  if (taskListIndex !== -1) {
    return { taskListIndex, tasks: taskLists[taskListIndex].tasks };
  }
  return { taskListIndex: -1, tasks: [] };
};

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
      const { taskListIndex, tasks } = findTaskListAndTasks(
        state.currentTasksList,
        action.payload
      );
      if (taskListIndex !== -1) {
        tasks.push({
          ...defaultTask,
          id: tasks.length.toString(),
        });
      }
    },
    collapseTaskList: (
      state,
      action: PayloadAction<{ tlid: string; collapsed: boolean }>
    ) => {
      console.log("collapsed", action.payload.collapsed);
      const { taskListIndex, tasks } = findTaskListAndTasks(
        state.currentTasksList,
        action.payload.tlid
      );
      if (taskListIndex !== -1) {
        state.currentTasksList[taskListIndex].tasks = tasks.map((task) => ({
          ...task,
          collapsed: action.payload.collapsed,
        }));
      }
    },
    updateTask: (
      state,
      action: PayloadAction<{ task: taskType; listId: string; newId?: string }>
    ) => {
      const { taskListIndex, tasks } = findTaskListAndTasks(
        state.currentTasksList,
        action.payload.listId
      );
      if (taskListIndex !== -1) {
        const tasksIndex = tasks.findIndex(
          (task) => task.id === action.payload.task.id
        );
        if (tasksIndex !== -1) {
          tasks[tasksIndex] = {
            ...action.payload.task,
            id: action.payload.newId || action.payload.task.id,
          };
        }
      }
    },
    deleteTask: (
      state,
      action: PayloadAction<{ tlid: string; tid: string }>
    ) => {
      const { taskListIndex, tasks } = findTaskListAndTasks(
        state.currentTasksList,
        action.payload.tlid
      );
      if (taskListIndex !== -1) {
        state.currentTasksList[taskListIndex].tasks = tasks.filter(
          (task) => task.id !== action.payload.tid
        );
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
  deleteTask,
  collapseTaskList,
} = tasksSlice.actions;

export default tasksSlice.reducer;
