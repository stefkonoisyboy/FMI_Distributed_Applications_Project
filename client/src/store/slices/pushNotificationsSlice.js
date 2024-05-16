import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSubscribed: false,
  showPushNotifications: true,
};

const pushNotificationsSlice = createSlice({
  name: "pushNotifications",
  initialState,
  reducers: {
    setIsSubscribed: (state, action) => {
      const newValue = action.payload;
      state.isSubscribed = newValue;
    },
    setShowPushNotifications: (state, action) => {
      const newValue = action.payload;
      state.showPushNotifications = newValue;
    },
  },
});

export const { setIsSubscribed, setShowPushNotifications } =
  pushNotificationsSlice.actions;
export default pushNotificationsSlice.reducer;

export const selectIsSubscribed = (state) =>
  state.pushNotifications.isSubscribed;
export const selectShowPushNotifications = (state) =>
  state.pushNotifications.showPushNotifications;
