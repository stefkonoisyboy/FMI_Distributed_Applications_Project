import { Avatar, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/authUserSlice";
import { useNavigate } from "react-router-dom";

const ProfileCard = () => {
  // General hooks
  const navigate = useNavigate();

  // Selectors
  const user = useSelector(selectUser);
  const { profileImageUrl, displayName, phoneNumber } = user;

  // Handlers
  const handleNavigateEditProfile = () => {
    navigate("/settings/edit-profile");
  };

  return (
    <Grid container alignItems="center" columnGap={2}>
      <Grid item>
        <Avatar src={profileImageUrl} sx={{ width: 56, height: 56 }}>
          {displayName[0]}
        </Avatar>
      </Grid>
      <Grid item xs sx={{ overflow: "hidden" }}>
        <Typography
          sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
          variant="subtitl1"
        >
          {displayName}
        </Typography>
        <Typography sx={{ color: "#74777F" }} variant="subtitle2">
          {phoneNumber}
        </Typography>
      </Grid>
      <Grid item>
        <Button
          onClick={handleNavigateEditProfile}
          sx={{
            borderRadius: "24px",
            backgroundColor: "#D3E4FF",
            textTransform: "unset",
          }}
        >
          Edit
        </Button>
      </Grid>
    </Grid>
  );
};

export default ProfileCard;
