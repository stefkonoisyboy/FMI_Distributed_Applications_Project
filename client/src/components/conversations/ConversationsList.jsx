import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectConversations } from "../../store/slices/conversationSlice";
import ConversationCard from "./ConversationCard";
import {
  APP_BAR_HEIGHT,
  BOTTOM_NAVIGATION_HEIGHT,
  CONVERSATIONS_LIST_MARGIN_TOP,
  CONVERSATIONS_LIST_PADDING_TOP,
  CONVERSATIONS_SEARCH_INPUT_HEIGHT,
  EDIT_CONVERSATIONS_BUTTON_HEIGHT,
} from "../../Constants";

const ConversationsList = () => {
  // Selectors
  const conversations = useSelector(selectConversations);

  // Other variables
  const maxHeight =
    window.innerHeight -
    (APP_BAR_HEIGHT +
      CONVERSATIONS_LIST_PADDING_TOP +
      CONVERSATIONS_SEARCH_INPUT_HEIGHT +
      CONVERSATIONS_LIST_MARGIN_TOP +
      EDIT_CONVERSATIONS_BUTTON_HEIGHT +
      BOTTOM_NAVIGATION_HEIGHT +
      10);

  return (
    <Box sx={{ marginTop: "20px", height: maxHeight, overflowY: "auto" }}>
      {conversations.length <= 0 && <Typography>No chats found</Typography>}

      {conversations.map((conversation) => (
        <ConversationCard key={conversation.id} conversation={conversation} />
      ))}
    </Box>
  );
};

export default ConversationsList;
