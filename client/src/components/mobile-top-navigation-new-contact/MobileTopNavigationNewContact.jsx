import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router";

const MobileTopNavigationNewContact = () => {
  // General hooks
  const navigate = useNavigate();

  // Handlers
  const handleNavigateContacts = () => {
    navigate("/contacts");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="inherit" elevation={0}>
        <Toolbar sx={{ padding: "16px" }}>
          <Stack
            sx={{ width: "100%" }}
            spacing={2}
            direction="row"
            alignItems="center"
          >
            <IconButton
              onClick={handleNavigateContacts}
              color="inherit"
              sx={{ padding: "0px" }}
            >
              <ArrowBackIcon sx={{ color: "#001E2F" }} />
            </IconButton>
            <Typography variant="h5" sx={{ color: "#001E2F", flexGrow: 1 }}>
              New contact
            </Typography>
            <Button
              type="submit"
              form="newContactForm"
              sx={{
                backgroundColor: "#D3E4FF",
                color: "#001E2F",
                borderRadius: "16px",
                paddingInline: "24px",
                "&:hover": {
                  backgroundColor: "#D3E4FF",
                },
              }}
              // onClick={handleNavigateContacts}
            >
              Save
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MobileTopNavigationNewContact;
