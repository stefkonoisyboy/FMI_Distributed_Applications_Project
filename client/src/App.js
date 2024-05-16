import { useCallback, useEffect, useState } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Root from "./routes/Root";
import Contacts from "./routes/Contacts";
import Chats from "./routes/Chats";
import Settings from "./routes/Settings";
import ErrorPage from "./routes/ErrorPage";
import Protected from "./components/protected/Protected";
import SignIn from "./routes/SignIn";
import SignUp from "./routes/SignUp";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "./store/slices/authUserSlice";
import { CHAT_HUB_URL } from "./Constants";
import { fetchUser, getAllUsers } from "./services/UserService";
import "react-toastify/dist/ReactToastify.css";
import Messages from "./routes/Messages";
import * as signalR from "@microsoft/signalr";
import {
  selectConnection,
  setConnection,
} from "./store/slices/hubConnectionSlice";
import { getAllConversationsForCurrentUser } from "./services/ConversationService";
import { setConversations } from "./store/slices/conversationSlice";
import NewContact from "./routes/NewContact";
import Contact from "./routes/Contact";
import Notifications from "./routes/Notifications";
import EditProfile from "./routes/EditProfile";
import { addMessage, setMessages } from "./store/slices/messageSlice";
import { getAllMessagesForConversation } from "./services/MessageService";
import { isLocalhost } from "./serviceWorkerRegistration";
import { messageError } from "./utils/notification";
import {
  setIsSubscribed,
  setShowPushNotifications,
} from "./store/slices/pushNotificationsSlice";
import { useServiceWorker } from "./hooks/useServiceWorker";
import { Button, Snackbar } from "@mui/material";
import CreateConversation from "./routes/CreateConversation";
import { setUsers } from "./store/slices/userSlice";
import NotFound from "./routes/NotFound";
import { storeAuthToken } from "./services/IndexedDbService";
import { registerSync } from "./services/ContactService";
import { getAllContacts } from "./services/ContactService";
import { setList } from "./store/slices/contactSlice";
import CreateGroupChat from "./routes/CreateGroupChat";
import {
  setInitiator,
  setIsCallContactDialogOpen,
  setIsVoiceCallDialogOpen,
  setReceiver,
} from "./store/slices/voiceCallSlice";

const router = (isAuthenticated) => {
  return createBrowserRouter([
    {
      path: "/",
      element: (
        <Protected>
          <Root />
        </Protected>
      ),
      children: [
        {
          errorElement: <ErrorPage />,
          children: [
            {
              index: true,
              element: <Chats />,
            },
            {
              path: "contacts",
              children: [
                {
                  index: true,
                  element: <Contacts />,
                },
                {
                  path: ":contactId",
                  element: <Contact />,
                },
                {
                  path: "new-contact",
                  element: <NewContact />,
                },
              ],
            },
            {
              path: "settings",
              children: [
                {
                  index: true,
                  element: <Settings />,
                },
                {
                  path: "notifications",
                  element: <Notifications />,
                },
                {
                  path: "edit-profile",
                  element: <EditProfile />,
                },
              ],
            },
            {
              path: "not-found",
              element: <NotFound />,
            },
            {
              path: "*",
              element: <Navigate to="not-found" />,
            },
          ],
        },
        {
          path: "settings",
          children: [
            {
              index: true,
              element: <Settings />,
            },
            {
              path: "notifications",
              element: <Notifications />,
            },
            {
              path: "edit-profile",
              element: <EditProfile />,
            },
          ],
        },
        {
          path: "conversations",
          children: [
            {
              path: "create",
              children: [
                {
                  index: true,
                  element: <CreateConversation />,
                },
                {
                  path: "group",
                  element: <CreateGroupChat />,
                },
              ],
            },
            {
              path: ":conversationId",
              element: <Messages />,
            },
          ],
        },
      ],
    },
    {
      path: "/sign-in",
      element: isAuthenticated ? <Navigate to="/" /> : <SignIn />,
    },
    {
      path: "/sign-up",
      element: isAuthenticated ? <Navigate to="/" /> : <SignUp />,
    },
  ]);
};

function App() {
  // General hooks
  const dispatch = useDispatch();

  // Custom hooks
  const { showReload, waitingWorker, reloadPage } = useServiceWorker();

  // Selectors
  const user = useSelector(selectUser);
  const isAuthenticated = Boolean(user);
  const connection = useSelector(selectConnection);

  // States
  const [authListened, setAuthListened] = useState(false);

  // Handlers
  const handleCheckSubscription = useCallback(async () => {
    if (isLocalhost) {
      dispatch(setShowPushNotifications(false));

      messageError("Localhost does not support service workers");

      return;
    }

    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      dispatch(setShowPushNotifications(false));

      messageError("");

      return;
    }

    const registration = await navigator.serviceWorker.ready;

    if (!registration.pushManager) {
      dispatch(setShowPushNotifications(false));

      messageError("Push manager not available");

      return;
    }

    const existingSubscription =
      await registration.pushManager.getSubscription();

    if (!existingSubscription) {
      dispatch(setIsSubscribed(false));
    } else {
      dispatch(setIsSubscribed(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Effects
  useEffect(() => {
    fetchUser()
      .then((response) => {
        const { data } = response;

        if (data) {
          storeAuthToken(data.token).then(() => {
            dispatch(setUser(data));
          });
        }
      })
      .catch((error) => {})
      .finally(() => {
        setAuthListened(true);
      });
    registerSync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const newConnection = new signalR.HubConnectionBuilder()
        .withUrl(CHAT_HUB_URL, { withCredentials: false }) // Adjust the URL as needed
        .withAutomaticReconnect()
        .build();

      dispatch(setConnection(newConnection));

      getAllConversationsForCurrentUser()
        .then((response) => {
          const { data } = response;

          if (data) {
            dispatch(setConversations(data));
          }
        })
        .catch((error) => {
          console.log("Error occurred", error);
        });

      getAllUsers().then((response) => {
        const { data } = response;

        if (data) {
          dispatch(setUsers(data));
        }
      });

      getAllContacts()
        .then((response) => {
          dispatch(setList(response.data));
        })
        .catch((error) => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  useEffect(() => {
    if (connection) {
      if (connection.state === signalR.HubConnectionState.Disconnected) {
        connection
          .start()
          .then(() => {
            console.log("Connection established");
          })
          .catch((err) => console.error(err));
      }

      connection.on("ReceiveMessage", (message) => {
        const parsedMessage = JSON.parse(message);

        dispatch(
          addMessage({
            conversationId: parsedMessage.conversationId,
            newMessage: parsedMessage,
          })
        );

        getAllConversationsForCurrentUser()
          .then((response) => {
            const { data } = response;

            if (data) {
              dispatch(setConversations(data));
            }
          })
          .catch((error) => {
            console.log("Error occurred", error);
          });
      });

      connection.on("MarkAsRead", (conversationId) => {
        getAllConversationsForCurrentUser()
          .then((response) => {
            const { data } = response;

            if (data) {
              dispatch(setConversations(data));
            }
          })
          .catch((error) => {
            console.log("Error occurred", error);
          });

        getAllMessagesForConversation(conversationId)
          .then((response) => {
            const { data } = response;

            if (data) {
              dispatch(setMessages({ conversationId, newMessages: data }));
            }
          })
          .catch((error) => {
            console.log("Error occurred", error);
          });
      });

      if (user) {
        connection.on(`VoiceCall/${user.id}`, (initiator) => {
          const initiatorData = JSON.parse(initiator);

          dispatch(setInitiator(initiatorData));
          dispatch(setIsCallContactDialogOpen(true));
        });

        connection.on(`VoiceCallEnded/${user.id}`, () => {
          dispatch(setInitiator({}));
          dispatch(setIsCallContactDialogOpen(false));

          dispatch(setReceiver({}));
          dispatch(setIsVoiceCallDialogOpen(false));
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connection, user]);

  useEffect(() => {
    handleCheckSubscription();
  }, [handleCheckSubscription]);

  if (!authListened) {
    return <></>;
  }

  return (
    <div>
      <Snackbar
        sx={{
          ".MuiPaper-root": {
            backgroundColor: "#F3F4F9",
            color: "#1C1B1F",
          },
        }}
        open={showReload && waitingWorker}
        message="New version available"
        action={
          <Button
            onClick={reloadPage}
            sx={{ color: "#1B72C0", textTransform: "unset" }}
          >
            Reload
          </Button>
        }
      />

      <RouterProvider router={router(isAuthenticated)} />
    </div>
  );
}

export default App;
