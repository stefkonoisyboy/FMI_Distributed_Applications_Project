import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  initiator: {},
  receiver: {},
  isCallContactDialogOpen: false,
  isVoiceCallDialogOpen: false,
};

const voiceCallSlice = createSlice({
  name: "voiceCall",
  initialState,
  reducers: {
    setInitiator: (state, action) => {
      const newInitiator = action.payload;
      state.initiator = newInitiator;
    },
    setReceiver: (state, action) => {
      const newReceiver = action.payload;
      state.receiver = newReceiver;
    },
    setIsCallContactDialogOpen: (state, action) => {
      const newValue = action.payload;
      state.isCallContactDialogOpen = newValue;
    },
    setIsVoiceCallDialogOpen: (state, action) => {
      const newValue = action.payload;
      state.isVoiceCallDialogOpen = newValue;
    },
  },
});

export const {
  setInitiator,
  setReceiver,
  setIsCallContactDialogOpen,
  setIsVoiceCallDialogOpen,
} = voiceCallSlice.actions;
export default voiceCallSlice.reducer;

export const selectInitiator = (state) => state.voiceCall.initiator;
export const selectReceiver = (state) => state.voiceCall.receiver;
export const selectIsCallContactDialogOpen = (state) =>
  state.voiceCall.isCallContactDialogOpen;
export const selectIsVoiceCallDialogOpen = (state) =>
  state.voiceCall.isVoiceCallDialogOpen;
