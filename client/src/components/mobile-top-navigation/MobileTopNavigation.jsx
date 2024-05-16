import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/authUserSlice";
import { removeAuthToken } from "../../services/IndexedDbService";

const MobileTopNavigation = () => {
  // General hooks
  const dispatch = useDispatch();

  // Handlers
  const handleLogOut = async () => {
    dispatch(setUser(null));
    try {
      await removeAuthToken();
    } catch (error) {}
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Chat App
          </Typography>
          <Button onClick={handleLogOut} color="inherit">
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MobileTopNavigation;
