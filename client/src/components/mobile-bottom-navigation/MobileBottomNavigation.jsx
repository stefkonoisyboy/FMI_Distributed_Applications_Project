import { useState } from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, PeopleAlt, Settings } from "@mui/icons-material";

const MobileBottomNavigation = () => {
  // General hooks
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // States
  const [value, setValue] = useState(0);

  // Other variables
  const shouldShowTabNavigation = !pathname.includes("conversations");

  // Handlers
  const handleNavigateToChats = () => {
    navigate("/");
  };

  const handleNavigateToContacts = () => {
    navigate("/contacts");
  };

  const handleNavigateToSettings = () => {
    navigate("/settings");
  };

  return (
    shouldShowTabNavigation && (
      <Box
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            onClick={handleNavigateToChats}
            label="Chats"
            icon={<Home />}
          />
          <BottomNavigationAction
            onClick={handleNavigateToContacts}
            label="Contacts"
            icon={<PeopleAlt />}
          />
          <BottomNavigationAction
            onClick={handleNavigateToSettings}
            label="Settings"
            icon={<Settings />}
          />
        </BottomNavigation>
      </Box>
    )
  );
};

export default MobileBottomNavigation;
