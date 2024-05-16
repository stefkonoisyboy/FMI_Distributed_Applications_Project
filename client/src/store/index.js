import { configureStore } from "@reduxjs/toolkit";
import authUser from "./slices/authUserSlice";
import conversation from "./slices/conversationSlice";
import message from "./slices/messageSlice";
import hubConnection from "./slices/hubConnectionSlice";
import contact from "./slices/contactSlice";
import pushNotifications from "./slices/pushNotificationsSlice";
import user from "./slices/userSlice";
import voiceCall from "./slices/voiceCallSlice";

export const store = configureStore({
  reducer: {
    authUser,
    conversation,
    message,
    hubConnection,
    contact,
    pushNotifications,
    user,
    voiceCall,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
