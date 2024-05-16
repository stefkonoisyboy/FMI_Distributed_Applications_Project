import { forwardRef, useEffect } from "react";
import { Dialog, Slide, Box, Typography, Avatar, Fab } from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import MicIcon from "@mui/icons-material/Mic";
import VideocamIcon from "@mui/icons-material/Videocam";
import CallEndIcon from "@mui/icons-material/CallEnd";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsVoiceCallDialogOpen,
  selectReceiver,
  setIsVoiceCallDialogOpen,
  setReceiver,
} from "../../store/slices/voiceCallSlice";
import { voiceCallEnded } from "../../services/VoiceCallService";
import { APP_ID } from "../../Constants";
import {
  RemoteUser,
  useJoin,
  useLocalMicrophoneTrack,
  usePublish,
  useRemoteUsers,
} from "agora-rtc-react";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const VoiceCallDialog = () => {
  // General hooks
  const dispatch = useDispatch();

  // Selectors
  const isVoiceCallDialogOpen = useSelector(selectIsVoiceCallDialogOpen);
  const receiver = useSelector(selectReceiver);

  // Audio-related hooks
  useJoin({
    appid: APP_ID,
    channel: "test",
    token: null,
    uid: null,
  });

  const { isLoading: isLoadingMic, localMicrophoneTrack } =
    useLocalMicrophoneTrack();
  const remoteUsers = useRemoteUsers();

  usePublish([localMicrophoneTrack]);

  // Other variables
  const { id, profileImageUrl, displayName, phoneNumber } = receiver;
  const deviceLoading = isLoadingMic;

  // Handlers
  const handleClose = () => {
    dispatch(setReceiver({}));
    dispatch(setIsVoiceCallDialogOpen(false));
  };

  const handleEndCall = async () => {
    await voiceCallEnded(id);
    handleClose();
  };

  // Effects
  useEffect(() => {
    return () => {
      localMicrophoneTrack?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (deviceLoading) return <div>Loading devices...</div>;

  return (
    <>
      <Dialog
        fullScreen
        open={isVoiceCallDialogOpen}
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
            <Typography>03:12</Typography>
          </Box>

          <Box sx={{ marginTop: "30px" }}>
            <Avatar
              sx={{ width: 100, height: 100 }}
              src={profileImageUrl}
              alt={displayName}
            />
          </Box>

          <Box sx={{ marginTop: "30px" }}>
            <Typography align="center">Connected</Typography>

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
            <Fab>
              <VolumeUpIcon />
            </Fab>

            <Fab>
              <MicIcon />
            </Fab>

            <Fab>
              <VideocamIcon />
            </Fab>
          </Box>

          <Box
            sx={{
              display: "flex",
              marginTop: "30px",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Fab onClick={handleEndCall} color="error">
              <CallEndIcon />
            </Fab>
          </Box>
        </Box>
      </Dialog>

      {remoteUsers?.map((remoteUser) => (
        <RemoteUser
          key={remoteUser.uid}
          user={remoteUser}
          playVideo={false}
          playAudio={true}
        />
      ))}
    </>
  );
};

export default VoiceCallDialog;
