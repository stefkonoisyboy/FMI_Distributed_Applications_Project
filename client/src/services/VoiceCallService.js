import axios from "axios";
import { VOICE_CALL_ENDED_USER_URL, VOICE_CALL_USER_URL } from "../Constants";
import { getAuthToken, removeAuthToken } from "./IndexedDbService";

axios.interceptors.request.use(async (config) => {
  const authToken = await getAuthToken();

  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken.authToken}`;
  }

  return config;
});

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle unauthorized access
    const status = error.response ? error.response.status : null;

    if (status === 401) {
      if (
        window.location.pathname !== "/sign-in" &&
        window.location.pathname !== "/sign-up"
      ) {
        window.location.assign("/sign-in");
      }

      await removeAuthToken();
    } else if (status === 404) {
      // Handle not found errors
      const currentUrl = window.location.href;
      const { origin } = new URL(currentUrl);
      window.location.href = `${origin}/not-found`;
    } else {
      // Handle other errors
      console.log("Other errors");
    }

    return Promise.reject(error);
  }
);

export const voiceCall = (userId) =>
  axios.post(VOICE_CALL_USER_URL.replace(":userId", userId), null, {});

export const voiceCallEnded = (userId) =>
  axios.post(VOICE_CALL_ENDED_USER_URL.replace(":userId", userId), null, {});
