import React from "react";
import { IconButton, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ContactList from "../components/contact-list/ContactList";
import { useNavigate } from "react-router";
import ContactSearch from "../components/contact-search/ContactSearch";

const Contacts = () => {
  // General hooks
  const navigate = useNavigate();

  // Handlers
  const handleNewContact = () => {
    navigate("/contacts/new-contact");
  };

  return (
    <Stack spacing={3} sx={{ position: "relative" }}>
      <ContactSearch />
      <ContactList />
      <IconButton
        onClick={handleNewContact}
        aria-label="add"
        sx={{
          width: "48px",
          height: "48px",
          position: "absolute",
          bottom: "16px",
          right: 0,
          borderRadius: "5px",
          backgroundColor: "#D3E4FF",
          "&:hover": {
            backgroundColor: "#D3E4FF",
          },
        }}
      >
        <AddIcon sx={{ color: "#45484F" }} />
      </IconButton>
    </Stack>
  );
};

export default Contacts;
