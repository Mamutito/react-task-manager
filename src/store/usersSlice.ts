import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { userType } from "../types";
export const defaultUser: userType = {
  id: "",
  isOnline: false,
  img: "",
  username: "",
  email: "",
  creationTime: "",
  lastSeen: "",
  bio: "",
};

interface UsersState {
  chats: string[];
  currentUser: userType;
  users: userType[];
}
const initialState: UsersState = {
  currentUser: defaultUser,
  users: [],
  chats: [],
};
export const usersSlice = createSlice({
  initialState,
  name: "users",
  reducers: {
    setUser: (state, action: PayloadAction<userType | undefined>) => {
      state.currentUser = action.payload || defaultUser;
    },
    setUsers: (state, action: PayloadAction<userType[] | undefined>) => {
      state.users = action.payload || [];
    },
  },
});

export const { setUser, setUsers } = usersSlice.actions;
export default usersSlice.reducer;
