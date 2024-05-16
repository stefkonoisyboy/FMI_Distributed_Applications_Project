import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getContactById } from "../services/ContactService";
import { Avatar, Fab, Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Call, Edit, Notifications } from "@mui/icons-material";
import { getUserByPhoneNumber } from "../services/UserService";
import {
  checkIfConversationWithParticipantsExists,
  createConversation,
} from "../services/ConversationService";
import { voiceCall } from "../services/VoiceCallService";
import { useDispatch } from "react-redux";
import {
  setIsVoiceCallDialogOpen,
  setReceiver,
} from "../store/slices/voiceCallSlice";

const Contact = () => {
  // General hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { contactId } = useParams();

  // State
  const [contact, setContact] = useState();

  // Handlers
  const handleClickMessage = async () => {
    const { data: user } = await getUserByPhoneNumber(contact.phone);

    if (user) {
      const participantsIds = [user.id];

      const { data: conversationId } =
        await checkIfConversationWithParticipantsExists(participantsIds);

      if (conversationId > 0) {
        navigate(`/conversations/${conversationId}`);
      } else {
        const payload = { usersIds: participantsIds };
        const { data: createdConversation } = await createConversation(payload);

        if (createdConversation) {
          navigate(`/conversations/${createdConversation.id}`);
        }
      }
    }
  };

  const handleVoiceCall = async () => {
    const { data: user } = await getUserByPhoneNumber(contact.phone);

    if (user) {
      dispatch(setIsVoiceCallDialogOpen(true));
      dispatch(setReceiver(user));

      await voiceCall(user.id);
    }
  };

  // Effects
  useEffect(() => {
    getContactById(contactId)
      .then((response) => {
        setContact(response.data);
      })
      .catch((error) => {});
  }, [contactId]);

  const { imageUrl, firstName, phone, address, city } = contact ?? {};

  if (!Boolean(contact)) {
    return <></>;
  }
  return (
    <Stack rowGap={4} alignItems="center">
      <Stack alignItems="center" rowGap={2}>
        <Avatar src={imageUrl} sx={{ width: 112, height: 112 }}>
          {firstName[0]}
        </Avatar>
        <Box>
          <Typography variant="h5" textAlign="center">
            {firstName}
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "#74777F" }}
            textAlign="center"
          >
            {phone}
          </Typography>
        </Box>
      </Stack>

      <Grid container justifyContent="space-around">
        <Grid item>
          <Stack rowGap={1} alignItems="center">
            <Fab
              onClick={handleClickMessage}
              sx={{ backgroundColor: "#1B72C0" }}
            >
              <Edit sx={{ color: "white" }} />
            </Fab>
            <Typography variant="body1" sx={{ color: "#1B72C0" }}>
              Message
            </Typography>
          </Stack>
        </Grid>
        <Grid item>
          <Stack rowGap={1} alignItems="center">
            <Fab onClick={handleVoiceCall} sx={{ backgroundColor: "#1B72C0" }}>
              <Call sx={{ color: "white" }} />
            </Fab>
            <Typography variant="body1" sx={{ color: "#1B72C0" }}>
              Call
            </Typography>
          </Stack>
        </Grid>
        <Grid item>
          <Stack rowGap={1} alignItems="center">
            <Fab sx={{ backgroundColor: "#1B72C0" }}>
              <Notifications sx={{ color: "white" }} />
            </Fab>
            <Typography variant="body1" sx={{ color: "#1B72C0" }}>
              Mute
            </Typography>
          </Stack>
        </Grid>
      </Grid>
      <Stack alignSelf="start" spacing={2}>
        <Typography alignSelf="start" variant="h6">
          Details
        </Typography>
        <Box>
          <Typography variant="body1">City: {city}</Typography>
          <Typography variant="body1">Address: {address}</Typography>
        </Box>
      </Stack>
    </Stack>
  );
};

export default Contact;
