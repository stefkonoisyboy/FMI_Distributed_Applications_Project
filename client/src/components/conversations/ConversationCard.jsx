import { Avatar, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ConversationCard = ({ conversation }) => {
  // General hooks
  const navigate = useNavigate();

  // Other variables
  const {
    id,
    imageUrl,
    title,
    unreadMessagesCount,
    lastMessage: { content, createdOn },
  } = conversation;

  // Handlers
  const handleConversationNavigate = () => navigate(`/conversations/${id}`);

  return (
    <Box
      onClick={handleConversationNavigate}
      sx={{
        marginTop: "20px",
        display: "flex",
        columnGap: "20px",
        alignItems: "center",
      }}
    >
      <Box>
        <Avatar sx={{ width: 56, height: 56 }} src={imageUrl} alt={title} />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          rowGap: "5px",
        }}
      >
        <Box>
          <Typography sx={{ fontWeight: "bold" }} variant="body1">
            {title}
          </Typography>
        </Box>

        <Box sx={{ maxWidth: "200px" }}>
          <Typography
            sx={{
              color: "#C1C1C7",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
            variant="body2"
          >
            {content}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", rowGap: "5px" }}>
        <Box>
          <Typography sx={{ color: "#C1C1C7" }} variant="body2">
            {createdOn}
          </Typography>
        </Box>

        {unreadMessagesCount > 0 && (
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <Avatar
              sx={{
                bgcolor: "#1974E6",
                width: 15,
                height: 15,
                padding: "5px",
                fontSize: "15px",
              }}
            >
              {unreadMessagesCount}
            </Avatar>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ConversationCard;
