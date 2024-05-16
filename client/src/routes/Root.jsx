import { Box, Container } from "@mui/material";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import MobileBottomNavigation from "../components/mobile-bottom-navigation/MobileBottomNavigation";
import MobileTopNavigation from "../components/mobile-top-navigation/MobileTopNavigation";
import MobileTopNavigationContacts from "../components/mobile-top-navigation-contacts/MobileTopNavigationContacts";
import MobileTopNavigationNewContact from "../components/mobile-top-navigation-new-contact/MobileTopNavigationNewContact";
import MobileTopNavigationContact from "../components/mobile-top-navigation-contact/MobileTopNavigationContact";
import MobileTopNavigationSettings from "../components/mobile-top-navigation-settings/MobileTopNavigationSettings";
import MobileTopNavigationNotifications from "../components/mobilr-top-navigation-notifications/MobileTopNavigationNotifications";
import MobileTopNavigationEditProfile from "../components/mobile-top-navigation-edit-profile/MobileTopNavigationEditProfile";
import CallContactDialog from "../components/voice-call/CallContactDialog";
import VoiceCallDialog from "../components/voice-call/VoiceCallDialog";
import {
  AgoraRTCProvider,
  useClientEvent,
  useRTCClient,
} from "agora-rtc-react";
import AgoraRTC from "agora-rtc-sdk-ng";
import { useSelector } from "react-redux";
import { selectIsVoiceCallDialogOpen } from "../store/slices/voiceCallSlice";

const renderNavigation = (pathname) => {
  const navigationMap = {
    "/contacts": <MobileTopNavigationContacts />,
    "/contacts/new-contact": <MobileTopNavigationNewContact />,
    "/contacts/:contactId": <MobileTopNavigationContact />,
    "/settings": <MobileTopNavigationSettings />,
    "/settings/notifications": <MobileTopNavigationNotifications />,
    "/settings/edit-profile": <MobileTopNavigationEditProfile />,
    // Add more mappings here
  };

  // Normalize the pathname by removing trailing slashes
  const normalizedPathname = pathname.replace(/\/+$/, "");
  const matchingPath = Object.keys(navigationMap).find((path) => {
    const regexPattern = new RegExp(`^${path.replace(/:[^/]+/g, "[^/]+")}$`);
    return regexPattern.test(normalizedPathname);
  });

  return matchingPath ? navigationMap[matchingPath] : <MobileTopNavigation />;
};

const Root = () => {
  // General hooks
  const { pathname } = useLocation();
  const client = useRTCClient(
    AgoraRTC.createClient({ codec: "vp8", mode: "rtc" })
  );

  // Selectors
  const isVoiceCallDialogOpen = useSelector(selectIsVoiceCallDialogOpen);

  useClientEvent(client, "user-joined", (user) => {
    console.log("The user", user.uid, " has joined the channel");
  });

  useClientEvent(client, "user-left", (user) => {
    console.log("The user", user.uid, " has left the channel");
  });

  useClientEvent(client, "user-published", (user, mediaType) => {
    console.log("The user", user.uid, " has published media in the channel");
  });

  return (
    <AgoraRTCProvider client={client}>
      <Box>
        {renderNavigation(pathname)}

        <Container>
          <Outlet />
        </Container>

        <MobileBottomNavigation />

        <CallContactDialog />

        {isVoiceCallDialogOpen && <VoiceCallDialog />}
      </Box>
    </AgoraRTCProvider>
  );
};

export default Root;
