import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { selectMessages } from "../../store/slices/messageSlice";
import MessagesCard from "./MessagesCard";
import {
  APP_BAR_HEIGHT,
  MESSAGES_BOTTOM_BAR_HEIGHT,
  MESSAGES_LIST_MARGIN_TOP,
  MESSAGES_TOP_BAR_HEIGHT,
  MESSAGES_TOP_BAR_MARGIN_TOP,
} from "../../Constants";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

const MessagesList = () => {
  // General hooks
  const { conversationId } = useParams();

  // Selectors
  const messagesMap = useSelector(selectMessages);

  // Refs
  const messagesListRef = useRef(null);

  // Other variables
  const maxHeight =
    window.innerHeight -
    (APP_BAR_HEIGHT +
      MESSAGES_TOP_BAR_MARGIN_TOP +
      MESSAGES_TOP_BAR_HEIGHT +
      MESSAGES_LIST_MARGIN_TOP +
      MESSAGES_BOTTOM_BAR_HEIGHT);

  const messages = messagesMap[conversationId];

  // Effects
  useEffect(() => {
    const messagesList = messagesListRef.current;

    if (messagesList) {
      messagesList.scrollTop = messagesList.scrollHeight;
    }
  }, [messages, conversationId]);

  return (
    <Box
      ref={messagesListRef}
      sx={{
        marginTop: "20px",
        height: maxHeight,
        overflowY: "auto",
        paddingBottom: "10px",
      }}
    >
      {messages?.map((message) => (
        <MessagesCard key={message.id} message={message} />
      ))}
    </Box>
  );
};

export default MessagesList;
