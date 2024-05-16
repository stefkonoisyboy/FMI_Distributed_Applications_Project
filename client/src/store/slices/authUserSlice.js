import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const authUserSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const newUser = action.payload;
      state.user = newUser;
    },
  },
});

// Actions
export const { setUser, setIsAuthenticated } = authUserSlice.actions;

export default authUserSlice.reducer;

// Selectors
export const selectUser = (state) => state.authUser.user;
