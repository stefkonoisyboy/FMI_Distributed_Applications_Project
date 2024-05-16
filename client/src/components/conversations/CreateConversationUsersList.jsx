import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import CreateConversationUsersListCard from "./CreateConversationUsersListCard";
import { selectList } from "../../store/slices/contactSlice";

const CreateConversationUsersList = () => {
  // Selectors
  const contacts = useSelector(selectList);

  return (
    <Box>
      <Typography sx={{ color: "#C1C1C7" }} variant="body2">
        Contacts
      </Typography>

      <Box>
        {contacts.map((contact) => (
          <CreateConversationUsersListCard key={contact.id} contact={contact} />
        ))}
      </Box>
    </Box>
  );
};

export default CreateConversationUsersList;
