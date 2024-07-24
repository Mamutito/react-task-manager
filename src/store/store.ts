import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice";
import tasksReducer from "./tasksSlice";
import chatSlice from "./chatSlice";

const store = configureStore({
  reducer: { users: usersReducer, tasks: tasksReducer, chat: chatSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
