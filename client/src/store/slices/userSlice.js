import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      const newUsers = action.payload;
      state.users = newUsers;
    },
  },
});

// Actions
export const { setUsers } = userSlice.actions;

export default userSlice.reducer;

// Selectors
export const selectUsers = (state) => state.user.users;
