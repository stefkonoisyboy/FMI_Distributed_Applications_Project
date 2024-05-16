import { Box, Avatar, Typography, Checkbox } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addGroupMember,
  removeGroupMember,
  selectGroupMembers,
} from "../../store/slices/conversationSlice";

const CreateGroupChatUsersListCard = ({ contact }) => {
  // General hooks
  const dispatch = useDispatch();

  // Selectors
  const groupMembers = useSelector(selectGroupMembers);

  // Other variables
  const { id, firstName, lastName, imageUrl } = contact;
  const displayName = firstName + " " + lastName;
  const isChecked = groupMembers.some((member) => member.id === id);

  // Handlers
  const handleClickCheckbox = () => {
    if (isChecked) {
      dispatch(removeGroupMember(id));
    } else {
      dispatch(addGroupMember(contact));
    }
  };

  return (
    <Box
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

      <Box sx={{ flexGrow: 1 }}>
        <Typography sx={{ fontWeight: "bold" }} variant="body1">
          {displayName}
        </Typography>
      </Box>

      <Box>
        <Checkbox onClick={handleClickCheckbox} checked={isChecked} />
      </Box>
    </Box>
  );
};

export default CreateGroupChatUsersListCard;
