import React, { useState } from "react";
import { Avatar, Box, Fab, Paper, Stack, TextField } from "@mui/material";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import { createContact } from "../services/ContactService";
import { messageError, messageSuccess } from "../utils/notification";
import { useNavigate } from "react-router";
import { addContactDb } from "../services/IndexedDbService";

const NewContact = () => {
  // General hooks
  const navigate = useNavigate();

  // States
  const [image, setImage] = useState(null);
  const [previewURL, setPreviewURL] = useState("");

  // Handlers
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append("image", image);

    const dataDb = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      phone: formData.get("phone"),
      address: formData.get("address"),
      city: formData.get("city"),
      image,
    };

    try {
      if (!navigator.onLine) {
        await addContactDb(dataDb);
      }

      await createContact(formData);

      messageSuccess("Successfully created contact");
      navigate("/contacts");
    } catch (error) {
      messageError("Failed to create contact");
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!Boolean(selectedFile)) return;
    setImage(selectedFile);

    // Generate preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewURL(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  return (
    <Stack
      sx={{
        height: "calc(100vh - 150px)",
        overflow: "auto",
      }}
      spacing={3}
      component="form"
      id="newContactForm"
      onSubmit={handleSubmit}
      noValidate
    >
      <Stack direction="row" spacing={2}>
        <PersonOutlineOutlinedIcon sx={{ visibility: "hidden" }} />
        {previewURL ? (
          <Box
            sx={{
              width: "100%",
              height: "160px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar
              component="label"
              htmlFor="image"
              src={previewURL}
              sx={{ width: 112, height: 112 }}
            />
          </Box>
        ) : (
          <Paper
            sx={{
              width: "100%",
              height: "160px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#F3F4F9",
              borderRadius: "56px",
            }}
          >
            <Fab
              component="label"
              htmlFor="image"
              sx={{ backgroundColor: "#D3E4FF" }}
            >
              <AddPhotoAlternateOutlinedIcon />
            </Fab>
          </Paper>
        )}
      </Stack>
      <input
        id="image"
        type="file"
        onChange={handleFileChange}
        accept="image/*"
        hidden
      />

      <Stack direction="row" alignItems="center" spacing={2}>
        <PersonOutlineOutlinedIcon />
        <TextField
          required
          id="firstName"
          name="firstName"
          type="text"
          placeholder="First name"
          fullWidth
        />
      </Stack>
      <Stack direction="row" alignItems="center" spacing={2}>
        <PersonOutlineOutlinedIcon sx={{ visibility: "hidden" }} />
        <TextField
          required
          id="lastName"
          name="lastName"
          type="text"
          placeholder="Last name"
          fullWidth
        />
      </Stack>
      <Stack direction="row" alignItems="center" spacing={2}>
        <PhoneOutlinedIcon />
        <TextField
          required
          id="phone"
          name="phone"
          type="phone"
          placeholder="Phone"
          fullWidth
        />
      </Stack>
      <Stack direction="row" alignItems="center" spacing={2}>
        <PlaceOutlinedIcon />
        <TextField
          required
          id="address"
          name="address"
          type="text"
          placeholder="Address"
          fullWidth
        />
      </Stack>
      <Stack direction="row" spacing={2}>
        <PlaceOutlinedIcon sx={{ visibility: "hidden" }} />

        <TextField
          required
          id="city"
          name="city"
          type="text"
          placeholder="City"
          fullWidth
        />
      </Stack>
    </Stack>
  );
};

export default NewContact;
