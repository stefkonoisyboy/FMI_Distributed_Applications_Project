import React from "react";
import {
  AppBar,
  Box,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const MobileTopNavigationSettings = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="inherit" elevation={0}>
        <Toolbar sx={{ flexDirection: "column", padding: "16px" }}>
          <Stack
            sx={{ width: "100%" }}
            direction="row"
            justifyContent="flex-end"
          >
            <IconButton color="inherit" sx={{ padding: "0px" }}>
              <MoreVertIcon sx={{ color: "#001E2F" }} />
            </IconButton>
          </Stack>
          <Typography
            variant="h5"
            sx={{ color: "#001E2F", alignSelf: "flex-start" }}
            gutterBottom
          >
            Settings
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MobileTopNavigationSettings;
