import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  connection: null,
};

export const hubConnectionSlice = createSlice({
  name: "hubConnection",
  initialState,
  reducers: {
    setConnection: (state, action) => {
      const newConnection = action.payload;
      state.connection = newConnection;
    },
  },
});

// Actions
export const { setConnection } = hubConnectionSlice.actions;

export default hubConnectionSlice.reducer;

// Selectors
export const selectConnection = (state) => state.hubConnection.connection;
