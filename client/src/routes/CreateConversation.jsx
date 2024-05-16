import { Avatar, Box, Typography } from "@mui/material";
import CreateConversationTopBar from "../components/conversations/CreateConversationTopBar";
import ConversationsSearchInput from "../components/conversations/ConversationsSearchInput";
import CreateConversationUsersList from "../components/conversations/CreateConversationUsersList";
import GroupIcon from "@mui/icons-material/Group";
import { useSelector } from "react-redux";
import { selectList } from "../store/slices/contactSlice";
import { useNavigate } from "react-router-dom";

const CreateConversation = () => {
  // General hooks
  const navigate = useNavigate();

  // Selectors
  const contacts = useSelector(selectList);

  // Handlers
  const handleNavigate = () => navigate("/conversations/create/group");

  return (
    <Box sx={{ padding: "10px 0" }}>
      <CreateConversationTopBar />

      <Box sx={{ marginTop: "20px" }}>
        <ConversationsSearchInput />
      </Box>

      {contacts.length <= 0 && <Typography>No contacts found</Typography>}

      {contacts.length > 0 && (
        <Box
          onClick={handleNavigate}
          sx={{
            display: "flex",
            alignItems: "center",
            columnGap: "20px",
            marginTop: "20px",
          }}
        >
          <Box>
            <Avatar sx={{ width: 56, height: 56 }}>
              <GroupIcon />
            </Avatar>
          </Box>

          <Box>
            <Typography sx={{ fontWeight: "bold" }} variant="body1">
              Group chat
            </Typography>
          </Box>
        </Box>
      )}

      {contacts.length > 0 && (
        <Box sx={{ marginTop: "20px" }}>
          <CreateConversationUsersList />
        </Box>
      )}
    </Box>
  );
};

export default CreateConversation;
