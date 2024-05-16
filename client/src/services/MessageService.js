import axios from "axios";
import {
  CREATE_MESSAGE_FOR_CONVERSATION_URL,
  GET_ALL_MESSAGES_FOR_CONVERSATION_URL,
  MARK_MESSAGES_AS_READ_URL,
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
    console.log("Error axios interceptor conversationService");

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

export const getAllMessagesForConversation = (conversationId) =>
  axios.get(
    GET_ALL_MESSAGES_FOR_CONVERSATION_URL.replace(
      ":conversationId",
      conversationId
    )
  );

export const createMessageForConversation = (data, conversationId) =>
  axios.post(
    CREATE_MESSAGE_FOR_CONVERSATION_URL.replace(
      ":conversationId",
      conversationId
    ),
    data,
    {}
  );

export const markMessageAsRead = (conversationId) =>
  axios.patch(
    MARK_MESSAGES_AS_READ_URL.replace(":conversationId", conversationId),
    null,
    {}
  );
