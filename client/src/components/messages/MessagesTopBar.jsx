import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  deleteConversation,
  getConversationById,
} from "../../services/ConversationService";
import { useSelector } from "react-redux";
import { selectMessages } from "../../store/slices/messageSlice";

const MessagesTopBar = () => {
  // General hooks
  const navigate = useNavigate();
  const { conversationId } = useParams();

  // Selectors
  const messagesMap = useSelector(selectMessages);

  // Other variables
  const messages = messagesMap[conversationId];

  // State
  const [conversation, setConversation] = useState();

  // Handlers
  const handleBackIconClick = async () => {
    if (messages?.length <= 0) {
      await deleteConversation(conversationId);
    }

    navigate("/");
  };

  // Effects
  useEffect(() => {
    getConversationById(conversationId)
      .then((response) => {
        const { data } = response;

        if (data) {
          setConversation(data);
        }
      })
      .catch((error) => {
        console.log("Error occurred", error);
      });
  }, [conversationId]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        columnGap: "10px",
        marginTop: "20px",
      }}
    >
      <Box>
        <IconButton onClick={handleBackIconClick}>
          <ArrowBackIcon sx={{ color: "#000" }} />
        </IconButton>
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        <Typography sx={{ fontWeight: "bold" }} variant="h6">
          {conversation?.title}
        </Typography>
      </Box>

      <Box>
        <IconButton>
          <CallOutlinedIcon sx={{ color: "#000" }} />
        </IconButton>
      </Box>

      <Box>
        <IconButton>
          <SearchOutlinedIcon sx={{ color: "#000" }} />
        </IconButton>
      </Box>

      <Box>
        <IconButton>
          <MoreVertOutlinedIcon sx={{ color: "#000" }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default MessagesTopBar;
