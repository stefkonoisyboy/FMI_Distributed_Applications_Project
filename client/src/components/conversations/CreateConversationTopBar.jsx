import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const CreateConversationTopBar = () => {
  const navigate = useNavigate();

  // Handlers
  const handleBackIconClick = () => navigate("/");

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
          New message
        </Typography>
      </Box>
    </Box>
  );
};

export default CreateConversationTopBar;
