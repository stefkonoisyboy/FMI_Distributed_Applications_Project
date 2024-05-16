import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  conversations: [],
  conversationTitle: "",
  groupMembers: [],
};

export const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    setConversations: (state, action) => {
      const newConversations = action.payload;
      state.conversations = newConversations;
    },
    setConversationTitle: (state, action) => {
      const newConversationTitle = action.payload;
      state.conversationTitle = newConversationTitle;
    },
    addGroupMember: (state, action) => {
      const newMember = action.payload;

      if (!state.groupMembers.some((member) => member.id === newMember.id)) {
        state.groupMembers.push(newMember);
      }
    },
    removeGroupMember: (state, action) => {
      const id = action.payload;

      state.groupMembers = state.groupMembers.filter(
        (member) => member.id !== id
      );
    },
    reset: (state) => {
      state.conversationTitle = "";
      state.groupMembers = [];
    },
  },
});

// Actions
export const {
  setConversations,
  setConversationTitle,
  addGroupMember,
  removeGroupMember,
  reset,
} = conversationSlice.actions;

export default conversationSlice.reducer;

// Selectors
export const selectConversations = (state) => state.conversation.conversations;
export const selectConversationTitle = (state) =>
  state.conversation.conversationTitle;
export const selectGroupMembers = (state) => state.conversation.groupMembers;
