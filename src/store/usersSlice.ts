import { createSlice } from "@reduxjs/toolkit";
export const defaultUser = {
  id: "",
  isOnline: false,
  img: "",
  username: "",
  email: "",
  creationTime: "",
  lastSeen: "",
  bio: "",
};
const initialState = { currentUser: defaultUser };
export const usersSlice = createSlice({
  initialState,
  name: "users",
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setUsers: (state, action) => {},
  },
});

export const { setUser, setUsers } = usersSlice.actions;
export default usersSlice.reducer;
