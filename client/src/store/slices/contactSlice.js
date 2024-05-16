import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  query: "",
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    setList: (state, action) => {
      const newList = action.payload;
      state.list = newList;
    },
    setQuery: (state, action) => {
      const newQuery = action.payload;
      state.query = newQuery;
    },
  },
});

export const { setList, setQuery } = contactSlice.actions;
export default contactSlice.reducer;

export const selectList = (state) => state.contact.list;
export const selectQuery = (state) => state.contact.query;
export const selectFilteredList = createSelector(
  [selectList, selectQuery],
  (list, query) => {
    return list.filter((contact) =>
      contact.firstName.toLowerCase().includes(query.toLowerCase())
    );
  }
);
