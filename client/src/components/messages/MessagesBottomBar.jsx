import { Box, IconButton } from "@mui/material";
import EnterMessageInput from "./EnterMessageInput";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import CollectionsIcon from "@mui/icons-material/Collections";

const MessagesBottomBar = () => {
  return (
    <Box sx={{ position: "absolute", bottom: 0 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          columnGap: "10px",
          paddingBottom: "10px",
        }}
      >
        <Box>
          <IconButton>
            <PhotoCameraIcon sx={{ color: "#1976D2" }} />
          </IconButton>
        </Box>

        <Box>
          <IconButton>
            <CollectionsIcon sx={{ color: "#1976D2" }} />
          </IconButton>
        </Box>

        <Box>
          <EnterMessageInput />
        </Box>
      </Box>
    </Box>
  );
};

export default MessagesBottomBar;
