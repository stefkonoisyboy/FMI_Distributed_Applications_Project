import axios from "axios";
import {
  GET_ALL_SUBSCRIPTIONS_URL,
  SEND_URL,
  SUBSCRIBE_URL,
  UNSUBSCRIBE_URL,
} from "../Constants";
import { getAuthToken, removeAuthToken } from "./IndexedDbService";

axios.interceptors.request.use(async (config) => {
  try {
    const authToken = await getAuthToken();
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken.authToken}`;
    }
    return config;
  } catch (error) {
    return {};
  }
});

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    try {
      const status = error.response ? error.response.status : null;

      if (status === 401) {
        if (
          window.location.pathname !== "/sign-in" &&
          window.location.pathname !== "/sign-up"
        ) {
          window.location.assign("/sign-in");
        }
        await removeAuthToken();
        // Handle unauthorized access
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
    } catch (error) {
      return {};
    }
  }
);

export const getAllSubscriptions = () => axios.get(GET_ALL_SUBSCRIPTIONS_URL);

export const subscribe = (data) => axios.post(SUBSCRIBE_URL, data, {});

export const send = (data) => axios.post(SEND_URL, data, {});

export const unsubscribe = (userId) =>
  axios.delete(UNSUBSCRIBE_URL.replace(":userId", userId));
