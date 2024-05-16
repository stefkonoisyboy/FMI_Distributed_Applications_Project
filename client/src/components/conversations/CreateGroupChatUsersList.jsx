import { useSelector } from "react-redux";
import { selectList } from "../../store/slices/contactSlice";
import { Box, Typography } from "@mui/material";
import CreateGroupChatUsersListCard from "./CreateGroupChatUsersListCard";

const CreateGroupChatUsersList = () => {
  // Selectors
  const contacts = useSelector(selectList);

  return (
    <Box>
      <Typography sx={{ color: "#C1C1C7" }} variant="body2">
        Contacts
      </Typography>

      <Box>
        {contacts.map((contact) => (
          <CreateGroupChatUsersListCard key={contact.id} contact={contact} />
        ))}
      </Box>
    </Box>
  );
};

export default CreateGroupChatUsersList;
