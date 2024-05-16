import { Avatar, Paper, Grid, Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/authUserSlice";
import { selectMessages } from "../../store/slices/messageSlice";

const MessagesCard = ({ message }) => {
  // Selectors
  const user = useSelector(selectUser);
  const messagesMap = useSelector(selectMessages);

  // Other variables
  const {
    id,
    content,
    senderId,
    senderProfileImageUrl,
    senderDisplayName,
    status,
    conversationId,
  } = message;

  const messages = messagesMap[conversationId];

  const isSender = user.id === senderId;

  const isLastMessage =
    messages && messages.length > 0 && messages[messages.length - 1].id === id;

  return (
    <Box sx={{ marginTop: "10px" }}>
      {isSender ? (
        <Grid container>
          <Grid item xs={4}></Grid>

          <Grid item xs={8}>
            <Box>
              <Paper
                elevation={0}
                sx={{
                  padding: "10px 15px",
                  borderRadius: "30px",
                  backgroundColor: "#1976D2",
                }}
              >
                <Typography sx={{ color: "#FFF", overflowWrap: "break-word" }}>
                  {content}
                </Typography>
              </Paper>

              {isLastMessage && status === "Read" && (
                <Typography sx={{ color: "#C1C1C7" }} align="right">
                  Seen
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      ) : (
        <Grid container>
          <Grid item xs={2}>
            <Avatar
              sx={{ width: 44, height: 44 }}
              src={senderProfileImageUrl}
              alt={senderDisplayName}
            />
          </Grid>

          <Grid item xs={8}>
            <Paper
              elevation={4}
              sx={{ padding: "10px 15px", borderRadius: "30px" }}
            >
              <Typography sx={{ overflowWrap: "break-word" }}>
                {content}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={2}></Grid>
        </Grid>
      )}
    </Box>
  );
};

export default MessagesCard;
