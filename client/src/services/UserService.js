import axios from "axios";
import {
  CHECK_EXISTING_EMAIL_URL,
  GET_ALL_USERS_URL,
  GET_USER_BY_PHONE_NUMBER_URL,
  GET_USER_URL,
  LOGIN_URL,
  REGISTER_URL,
  UPDATE_USER_URL,
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
    console.error("Error axios interceptor in userService");
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
      console.error("Error axios interceptor in userService");
      return {};
    }
  }
);

export const getAllUsers = () => axios.get(GET_ALL_USERS_URL);

export const getUserByPhoneNumber = (phoneNumber) =>
  axios.get(GET_USER_BY_PHONE_NUMBER_URL.replace(":phoneNumber", phoneNumber));

export const fetchUser = () => axios.get(GET_USER_URL);

export const checkEmailExists = (email) =>
  axios.get(CHECK_EXISTING_EMAIL_URL, {
    params: {
      email,
    },
  });

export const registerUser = (data) => axios.post(REGISTER_URL, data, {});
export const loginUser = (data) => axios.post(LOGIN_URL, data, {});
export const updateUser = (data) => axios.patch(UPDATE_USER_URL, data);
