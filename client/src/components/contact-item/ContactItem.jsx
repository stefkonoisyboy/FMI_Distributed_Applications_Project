import { Avatar, Grid, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";

const ContactItem = ({ contact }) => {
  // Props
  const { id, firstName, imageUrl } = contact;

  // General hooks
  const navigate = useNavigate();

  // Handlers
  const handleNavigate = () => {
    navigate(`/contacts/${id}`);
  };

  return (
    <Grid onClick={handleNavigate} container alignItems="center" columnGap={2}>
      <Grid item>
        <Avatar src={imageUrl} sx={{ width: 48, height: 48 }}>
          {firstName[0]}
        </Avatar>
      </Grid>
      <Grid item xs sx={{ overflow: "hidden" }}>
        <Typography sx={{ overflow: "hidden", textOverflow: "ellipsis" }}>
          {firstName}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ContactItem;
