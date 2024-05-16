import axios from "axios";
import {
  CONVERSATION_EXISTS_URL,
  CREATE_CONVERSATION_URL,
  GET_ALL_CONVERSATIONS_FOR_CURRENT_USER_URL,
  GET_CONVERSATION_BY_ID_URL,
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
      console.log("Error axios interceptor conversationService");

      return {};
    }
  }
);

export const getAllConversationsForCurrentUser = () =>
  axios.get(GET_ALL_CONVERSATIONS_FOR_CURRENT_USER_URL);

export const getConversationById = (conversationId) =>
  axios.get(
    GET_CONVERSATION_BY_ID_URL.replace(":conversationId", conversationId)
  );

export const checkIfConversationWithParticipantsExists = (data) =>
  axios.post(CONVERSATION_EXISTS_URL, data, {});

export const createConversation = (data) =>
  axios.post(CREATE_CONVERSATION_URL, data, {});

export const deleteConversation = (conversationId) =>
  axios.delete(
    GET_CONVERSATION_BY_ID_URL.replace(":conversationId", conversationId)
  );
