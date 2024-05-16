import { forwardRef } from "react";
import { Dialog, Slide, Box, Typography, Avatar, Fab } from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import CallEndIcon from "@mui/icons-material/CallEnd";
import { useDispatch, useSelector } from "react-redux";
import {
  selectInitiator,
  selectIsCallContactDialogOpen,
  setInitiator,
  setIsCallContactDialogOpen,
  setIsVoiceCallDialogOpen,
  setReceiver,
} from "../../store/slices/voiceCallSlice";
import { voiceCallEnded } from "../../services/VoiceCallService";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CallContactDialog = () => {
  // General hooks
  const dispatch = useDispatch();

  // Selectors
  const initiator = useSelector(selectInitiator);
  const isCallContactDialogOpen = useSelector(selectIsCallContactDialogOpen);

  // Other variables
  const { id, profileImageUrl, displayName, phoneNumber } = initiator;

  // Handlers
  const handleClose = () => {
    dispatch(setInitiator({}));
    dispatch(setIsCallContactDialogOpen(false));
  };

  const handleAnswerCall = () => {
    dispatch(setIsVoiceCallDialogOpen(true));
    dispatch(setReceiver(initiator));
    handleClose();
  };

  const handleDeclineCall = async () => {
    await voiceCallEnded(id);
    handleClose();
  };

  return (
    <>
      <Dialog
        fullScreen
        open={isCallContactDialogOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBlock: "50px",
          }}
        >
          <Box>
            <Typography>Voice call</Typography>
          </Box>

          <Box sx={{ marginTop: "30px" }}>
            <Avatar
              sx={{ width: 100, height: 100 }}
              src={profileImageUrl}
              alt={displayName}
            />
          </Box>

          <Box sx={{ marginTop: "30px" }}>
            <Typography align="center" variant="h4">
              {displayName}
            </Typography>

            <Typography align="center" variant="h6">
              {phoneNumber}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              marginTop: "30px",
              flexDirection: "row",
              justifyContent: "center",
              columnGap: "30px",
            }}
          >
            <Fab onClick={handleAnswerCall} color="success">
              <CallIcon />
            </Fab>

            <Fab onClick={handleDeclineCall} color="error">
              <CallEndIcon />
            </Fab>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default CallContactDialog;
