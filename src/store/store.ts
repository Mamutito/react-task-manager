import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice";
import tasksReducer from "./tasksSlice";

const store = configureStore({
  reducer: { users: usersReducer, tasks: tasksReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
