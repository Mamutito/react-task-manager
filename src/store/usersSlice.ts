import { createSlice } from "@reduxjs/toolkit";

const initialState = {};
export const usersSlice = createSlice({
  initialState,
  name: "users",
  reducers: {
    setUser: (state, action) => {},
    setUsers: (state, action) => {},
  },
});

export const { setUser, setUsers } = usersSlice.actions;
export default usersSlice.reducer;
