import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import * as signalR from "@microsoft/signalr";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createMessageForConversation } from "../../services/MessageService";
import { selectConnection } from "../../store/slices/hubConnectionSlice";

const EnterMessageInput = () => {
  // General hooks
  const { conversationId } = useParams();

  // Selectors
  const connection = useSelector(selectConnection);

  // State
  const [message, setMessage] = useState("");

  // Handlers
  const handleMessageChange = (e) => setMessage(e.target.value);

  const handleSendMessage = async () => {
    if (message.trim() !== "") {
      const payload = {
        content: message,
      };

      if (connection.state === signalR.HubConnectionState.Connected) {
        await createMessageForConversation(payload, conversationId);
        setMessage("");
      }
    }
  };

  return (
    <TextField
      placeholder="Message"
      id="outlined-start-adornment"
      InputProps={{
        sx: {
          borderRadius: "20px",
          backgroundColor: "#EFF1F8",
          "& .MuiOutlinedInput-notchedOutline": { border: "none" },
        },
        endAdornment: Boolean(message.trim()) && (
          <InputAdornment position="start">
            <IconButton onClick={handleSendMessage}>
              <SendIcon sx={{ color: "#1976D2" }} />
            </IconButton>
          </InputAdornment>
        ),
      }}
      fullWidth
      onChange={handleMessageChange}
      value={message}
    />
  );
};

export default EnterMessageInput;
