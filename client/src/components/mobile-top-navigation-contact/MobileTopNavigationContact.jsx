import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { IconButton, Stack } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router";
import { deleteContact } from "../../services/ContactService";
import { DeleteOutlineOutlined } from "@mui/icons-material";
import ConfirmAlert from "../confirm-alert/ConfirmAlert";

const MobileTopNavigationContact = () => {
  // General hooks
  const navigate = useNavigate();
  const { contactId } = useParams();
  const [open, setOpen] = React.useState(false);

  // Handlers
  const handleNavigateContacts = () => {
    navigate("/contacts");
  };

  const handleDelete = async () => {
    await deleteContact(contactId);
    handleNavigateContacts();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const alert = {
    title: "Delete Contact?",
    content:
      "This contact will be removed from all your synced devices.This action cannot be undone.",
    cancelButtonText: "Cancel",
    confirmButtonText: "Delete",
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
            justifyContent="space-between"
          >
            <IconButton
              onClick={handleNavigateContacts}
              color="inherit"
              sx={{ padding: "0px" }}
            >
              <ArrowBackIcon sx={{ color: "#001E2F" }} />
            </IconButton>

            <IconButton
              onClick={handleClickOpen}
              color="inherit"
              sx={{ padding: "0px" }}
            >
              <DeleteOutlineOutlined sx={{ color: "#001E2F" }} />
            </IconButton>

            <ConfirmAlert
              open={open}
              handleClose={handleClose}
              handleAction={handleDelete}
              {...alert}
            />
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MobileTopNavigationContact;
