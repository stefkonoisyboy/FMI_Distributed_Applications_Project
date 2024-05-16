import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: {},
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      const { conversationId, newMessages } = action.payload;
      state.messages[conversationId] = newMessages;
    },
    addMessage: (state, action) => {
      const { conversationId, newMessage } = action.payload;

      if (!state.messages[conversationId].some((m) => m.id === newMessage.id)) {
        state.messages[conversationId].push(newMessage);
      }
    },
  },
});

// Actions
export const { setMessages, addMessage } = messageSlice.actions;

export default messageSlice.reducer;

// Selectors
export const selectMessages = (state) => state.message.messages;
