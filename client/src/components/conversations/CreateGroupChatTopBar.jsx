import { Box, Button, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  reset,
  selectConversationTitle,
  selectGroupMembers,
  setConversationTitle,
} from "../../store/slices/conversationSlice";
import { getUserByPhoneNumber } from "../../services/UserService";
import {
  checkIfConversationWithParticipantsExists,
  createConversation,
} from "../../services/ConversationService";

const CreateGroupChatTopBar = () => {
  // General hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Selectors
  const conversationTitle = useSelector(selectConversationTitle);
  const groupMembers = useSelector(selectGroupMembers);

  // Handlers
  const handleReset = () => dispatch(reset());

  const handleBackIconClick = () => {
    navigate("/conversations/create");
    handleReset();
  };

  const handleCreateGroupChat = async () => {
    const participantsIds = [];

    for (let i = 0; i < groupMembers.length; i++) {
      const { phone } = groupMembers[i];
      const { data: user } = await getUserByPhoneNumber(phone);

      if (user) {
        participantsIds.push(user.id);
      }
    }

    const { data: conversationId } =
      await checkIfConversationWithParticipantsExists(participantsIds);

    if (conversationId > 0) {
      navigate(`/conversations/${conversationId}`);
    } else {
      const payload = { usersIds: participantsIds, title: conversationTitle };
      const { data: createdConversation } = await createConversation(payload);

      if (createdConversation) {
        navigate(`/conversations/${createdConversation.id}`);
      }
    }

    handleReset();
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        columnGap: "10px",
        marginTop: "20px",
      }}
    >
      <Box>
        <IconButton onClick={handleBackIconClick}>
          <ArrowBackIcon sx={{ color: "#000" }} />
        </IconButton>
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        <Typography sx={{ fontWeight: "bold" }} variant="h6">
          New group
        </Typography>
      </Box>

      <Box>
        <Button
          disabled={groupMembers.length < 2}
          onClick={handleCreateGroupChat}
          variant="text"
        >
          Create
        </Button>
      </Box>
    </Box>
  );
};

export default CreateGroupChatTopBar;
