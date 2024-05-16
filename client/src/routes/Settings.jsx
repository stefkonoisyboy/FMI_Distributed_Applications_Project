import { Grid, Stack, Typography } from "@mui/material";
import React from "react";
import ProfileCard from "../components/profile-card/ProfileCard";
import {
  CloudOutlined,
  DarkModeOutlined,
  HelpOutlineOutlined,
  LockOutlined,
  NotificationsOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  // General hooks
  const navigate = useNavigate();

  // Handlers
  const handleNavigateNavigations = () => {
    navigate("/settings/notifications");
  };

  return (
    <Stack spacing={1}>
      <ProfileCard />
      <Typography sx={{ color: "#1B72C0" }}>General</Typography>
      <Grid
        onClick={handleNavigateNavigations}
        container
        columnGap={1}
        sx={{ padding: "8px" }}
      >
        <Grid item>
          <NotificationsOutlined
            sx={{ width: "24px", height: "24px", color: "#458BCC" }}
          />
        </Grid>
        <Grid item xs>
          <Typography>Notifications</Typography>
        </Grid>
      </Grid>
      <Grid container columnGap={1} sx={{ padding: "8px" }}>
        <Grid item>
          <DarkModeOutlined
            sx={{ width: "24px", height: "24px", color: "#458BCC" }}
          />
        </Grid>
        <Grid item xs>
          <Typography>Appearance</Typography>
        </Grid>
      </Grid>
      <Grid container columnGap={1} sx={{ padding: "8px" }}>
        <Grid item>
          <LockOutlined
            sx={{ width: "24px", height: "24px", color: "#458BCC" }}
          />
        </Grid>
        <Grid item xs>
          <Typography>Privacy</Typography>
        </Grid>
      </Grid>
      <Grid container columnGap={1} sx={{ padding: "8px" }}>
        <Grid item>
          <CloudOutlined
            sx={{ width: "24px", height: "24px", color: "#458BCC" }}
          />
        </Grid>
        <Grid item xs>
          <Typography>Storage & Data</Typography>
        </Grid>
      </Grid>
      <Grid container columnGap={1} sx={{ padding: "8px" }}>
        <Grid item>
          <HelpOutlineOutlined
            sx={{ width: "24px", height: "24px", color: "#458BCC" }}
          />
        </Grid>
        <Grid item xs>
          <Typography>About</Typography>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Settings;
