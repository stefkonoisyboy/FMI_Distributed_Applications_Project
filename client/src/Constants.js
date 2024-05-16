export const BACKEND_API = "https://localhost:5001/api/v1";
export const CHAT_HUB_URL = `https://localhost:5001/chathub`;

export const GET_ALL_USERS_URL = `${BACKEND_API}/users`;
export const GET_USER_BY_PHONE_NUMBER_URL = `${BACKEND_API}/users/by-phone/:phoneNumber`;

export const GET_USER_URL = `${BACKEND_API}/account`;
export const LOGIN_URL = `${BACKEND_API}/account/login`;
export const REGISTER_URL = `${BACKEND_API}/account/register`;
export const UPDATE_USER_URL = `${BACKEND_API}/account`;
export const CHECK_EXISTING_EMAIL_URL = `${BACKEND_API}/account/emailexists`;

export const CONTACT_URL = `${BACKEND_API}/contacts`;
export const CONTACT_BY_ID_URL = `${BACKEND_API}/contacts/:contactId`;

export const GET_ALL_CONVERSATIONS_FOR_CURRENT_USER_URL = `${BACKEND_API}/conversations`;
export const GET_CONVERSATION_BY_ID_URL = `${BACKEND_API}/conversations/:conversationId`;
export const CONVERSATION_EXISTS_URL = `${BACKEND_API}/conversations/exists`;
export const CREATE_CONVERSATION_URL =
  GET_ALL_CONVERSATIONS_FOR_CURRENT_USER_URL;
export const DELETE_CONVERSATION_URL = GET_CONVERSATION_BY_ID_URL;

export const GET_ALL_MESSAGES_FOR_CONVERSATION_URL = `${BACKEND_API}/messages/:conversationId`;

export const CREATE_MESSAGE_FOR_CONVERSATION_URL =
  GET_ALL_MESSAGES_FOR_CONVERSATION_URL;

export const MARK_MESSAGES_AS_READ_URL = GET_ALL_MESSAGES_FOR_CONVERSATION_URL;

export const VOICE_CALL_USER_URL = `${BACKEND_API}/voiceCalls/:userId`;
export const VOICE_CALL_ENDED_USER_URL = `${BACKEND_API}/voiceCalls/call-ended/:userId`;

export const GET_ALL_SUBSCRIPTIONS_URL = `${BACKEND_API}/pushNotifications`;
export const SUBSCRIBE_URL = GET_ALL_SUBSCRIPTIONS_URL + "/subscribe";
export const SEND_URL = GET_ALL_SUBSCRIPTIONS_URL + "/send";
export const UNSUBSCRIBE_URL =
  GET_ALL_SUBSCRIPTIONS_URL + "/unsubscribe/:userId";

export const KEY_TOKEN = "authToken";

export const APP_BAR_HEIGHT = 56;

export const MESSAGES_TOP_BAR_HEIGHT = 40;
export const MESSAGES_TOP_BAR_MARGIN_TOP = 20;

export const MESSAGES_LIST_MARGIN_TOP = 20;

export const MESSAGES_BOTTOM_BAR_HEIGHT = 76;

export const CONVERSATIONS_LIST_PADDING_TOP = 10;
export const CONVERSATIONS_LIST_MARGIN_TOP = 20;

export const CONVERSATIONS_SEARCH_INPUT_HEIGHT = 56;

export const EDIT_CONVERSATIONS_BUTTON_HEIGHT = 56;

export const BOTTOM_NAVIGATION_HEIGHT = 56;

export const PUBLIC_PUSH_KEY =
  "BDZJSiMXSJUhryPkjFh_H84ZeEjVNfq5STCXVDEW4bpXye1mybGCjufRFIVmMxJN1wHOGUunGyBra0qvSa0fGJ8";

export const APP_ID = "35e82c3453b24cd0a016bdca1a94d382";
