import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMessagesForConversation,
  markMessageAsRead,
} from "../services/MessageService";
import { useParams } from "react-router-dom";
import MessagesTopBar from "../components/messages/MessagesTopBar";
import { Box } from "@mui/material";
import MessagesList from "../components/messages/MessagesList";
import { addMessage, setMessages } from "../store/slices/messageSlice";
import MessagesBottomBar from "../components/messages/MessagesBottomBar";
import { selectConnection } from "../store/slices/hubConnectionSlice";
import * as signalR from "@microsoft/signalr";

const Messages = () => {
  // General hooks
  const dispatch = useDispatch();
  const { conversationId } = useParams();

  // Selectors
  const connection = useSelector(selectConnection);

  // Effects
  useEffect(() => {
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

    markMessageAsRead(conversationId)
      .then((response) => {})
      .catch((error) => {
        console.log("Error occurred", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId]);

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

        if (Number(conversationId) === parsedMessage.conversationId) {
          dispatch(
            addMessage({
              conversationId: parsedMessage.conversationId,
              newMessage: parsedMessage,
            })
          );

          markMessageAsRead(parsedMessage.conversationId)
            .then((response) => {})
            .catch((error) => {
              console.log("Error occurred", error);
            });
        }
      });
    }

    return () => {
      if (connection) {
        connection.off("ReceiveMessage");
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connection]);

  return (
    <Box>
      <MessagesTopBar />

      <MessagesList />

      <MessagesBottomBar />
    </Box>
  );
};

export default Messages;
