import { Avatar, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  checkIfConversationWithParticipantsExists,
  createConversation,
} from "../../services/ConversationService";
import { getUserByPhoneNumber } from "../../services/UserService";

const CreateConversationUsersListCard = ({ contact }) => {
  // General hooks
  const navigate = useNavigate();

  // Other variables
  const { firstName, lastName, imageUrl, phone } = contact;
  const displayName = firstName + " " + lastName;

  // Handlers
  const handleClickUserCard = async () => {
    const { data: user } = await getUserByPhoneNumber(phone);

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

  return (
    <Box
      onClick={handleClickUserCard}
      sx={{
        marginTop: "20px",
        display: "flex",
        columnGap: "20px",
        alignItems: "center",
      }}
    >
      <Box>
        <Avatar
          sx={{ width: 56, height: 56 }}
          src={imageUrl}
          alt={displayName}
        />
      </Box>

      <Box>
        <Typography sx={{ fontWeight: "bold" }} variant="body1">
          {displayName}
        </Typography>
      </Box>
    </Box>
  );
};

export default CreateConversationUsersListCard;
