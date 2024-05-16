import React from "react";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const MobileTopNavigationNotifications = () => {
  // General hooks
  const navigate = useNavigate();

  // Handlers
  const handleNavigateSettings = () => {
    navigate("/settings");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="inherit" elevation={0}>
        <Toolbar sx={{ padding: "16px" }}>
          <IconButton
            onClick={handleNavigateSettings}
            color="inherit"
            sx={{ padding: "0px" }}
          >
            <ArrowBackIcon sx={{ color: "#001E2F" }} />
          </IconButton>
          <Typography
            variant="h5"
            sx={{ marginLeft: "16px", color: "#001E2F" }}
          >
            Notifications
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MobileTopNavigationNotifications;
