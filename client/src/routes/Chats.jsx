import { Box, IconButton } from "@mui/material";
import ConversationsList from "../components/conversations/ConversationsList";
import ConversationsSearchInput from "../components/conversations/ConversationsSearchInput";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useNavigate } from "react-router-dom";

const Chats = () => {
  // General hooks
  const navigate = useNavigate();

  // Handlers
  const handleNavigate = () => navigate("/conversations/create");

  return (
    <Box sx={{ padding: "10px 0" }}>
      <ConversationsSearchInput />

      <ConversationsList />

      <IconButton
        onClick={handleNavigate}
        aria-label="add"
        sx={{
          width: "56px",
          height: "56px",
          position: "absolute",
          bottom: "60px",
          right: "10px",
          borderRadius: "10px",
          backgroundColor: "#D3E4FF",
          "&:hover": {
            backgroundColor: "#D3E4FF",
          },
          boxShadow: 3,
        }}
      >
        <EditOutlinedIcon sx={{ color: "#45484F" }} />
      </IconButton>
    </Box>
  );
};

export default Chats;
