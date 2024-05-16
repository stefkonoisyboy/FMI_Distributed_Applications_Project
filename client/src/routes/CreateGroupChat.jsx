import { Box, TextField, Typography } from "@mui/material";
import ConversationsSearchInput from "../components/conversations/ConversationsSearchInput";
import { useDispatch, useSelector } from "react-redux";
import { selectList } from "../store/slices/contactSlice";
import CreateGroupChatTopBar from "../components/conversations/CreateGroupChatTopBar";
import CreateGroupChatUsersList from "../components/conversations/CreateGroupChatUsersList";
import {
  selectConversationTitle,
  setConversationTitle,
} from "../store/slices/conversationSlice";

const CreateGroupChat = () => {
  // General hooks
  const dispatch = useDispatch();

  // Selectors
  const contacts = useSelector(selectList);
  const conversationTitle = useSelector(selectConversationTitle);

  // Handlers
  const handleConversationTitleChange = (e) =>
    dispatch(setConversationTitle(e.target.value));

  return (
    <Box sx={{ padding: "10px 0" }}>
      <CreateGroupChatTopBar />

      <Box sx={{ marginTop: "20px" }}>
        <TextField
          placeholder="Group name (optional)"
          id="outlined-start-adornment"
          InputProps={{
            sx: {
              borderRadius: "20px",
              backgroundColor: "#EFF1F8",
              "& .MuiOutlinedInput-notchedOutline": { border: "none" },
            },
          }}
          fullWidth
          value={conversationTitle}
          onChange={handleConversationTitleChange}
        />
      </Box>

      <Box sx={{ marginTop: "20px" }}>
        <ConversationsSearchInput />
      </Box>

      {contacts.length <= 0 && <Typography>No contacts found</Typography>}

      {contacts.length > 0 && (
        <Box sx={{ marginTop: "20px" }}>
          <CreateGroupChatUsersList />
        </Box>
      )}
    </Box>
  );
};

export default CreateGroupChat;
