import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton, Stack, Typography } from "@mui/material";

const MobileTopNavigationContacts = () => {
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
            Contacts
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MobileTopNavigationContacts;
