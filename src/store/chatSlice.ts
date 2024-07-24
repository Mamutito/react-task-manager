import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isChatTab: false,
};

const chatsSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChatTab: (state, action: PayloadAction<boolean>) => {
      state.isChatTab = action.payload;
    },
  },
});

export const { setChatTab } = chatsSlice.actions;
export default chatsSlice.reducer;
