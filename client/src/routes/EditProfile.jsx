import { Avatar, Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "../store/slices/authUserSlice";
import { updateUser } from "../services/UserService";
import { messageError, messageSuccess } from "../utils/notification";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  // General hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Selectors
  const { profileImageUrl, displayName, phoneNumber } = useSelector(selectUser);

  // States
  const [name, setName] = useState(displayName);
  const [phone, setPhone] = useState(phoneNumber);
  const [image, setImage] = useState(null);
  const [previewURL, setPreviewURL] = useState(profileImageUrl);

  // Handlers
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

  const handleChangeName = (e) => {
    const newName = e.target.value;
    setName(newName);
  };

  const handleChangePhone = (e) => {
    const newPhone = e.target.value;
    setPhone(newPhone);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("displayName", name);
    formData.append("image", image);
    formData.append("phoneNumber", phone);

    try {
      const { data } = await updateUser(formData);
      if (data) {
        dispatch(setUser(data));
        messageSuccess("Successfully updated profile");
        navigate("/settings");
      }
    } catch (error) {
      messageError("Failed to update profile");
    }
  };

  const hasChanges =
    displayName !== name || Boolean(image) || phoneNumber !== phone;
  return (
    <Stack spacing={3} alignItems="center">
      <Avatar
        component="label"
        htmlFor="image"
        src={previewURL || profileImageUrl}
        sx={{ width: "126px", height: "126px" }}
      >
        {displayName[0]}
      </Avatar>
      <input
        id="image"
        type="file"
        onChange={handleFileChange}
        accept="image/*"
        hidden
      />
      <TextField
        value={name}
        onChange={handleChangeName}
        label="Display Name"
        fullWidth
      />
      <TextField
        value={phone}
        onChange={handleChangePhone}
        label="Phone"
        fullWidth
      />
      <Button
        onClick={handleSubmit}
        sx={{
          borderRadius: "24px",
          backgroundColor: !hasChanges ? "#CCCC" : "#D3E4FF",
          textTransform: "unset",
          "&:hover": {
            backgroundColor: "initial",
          },
        }}
        fullWidth
        disabled={!hasChanges}
      >
        Edit Profile
      </Button>
    </Stack>
  );
};

export default EditProfile;
