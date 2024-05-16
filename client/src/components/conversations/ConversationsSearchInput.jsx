import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const ConversationsSearchInput = () => {
  return (
    <TextField
      placeholder="Search"
      id="outlined-start-adornment"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        sx: {
          borderRadius: "20px",
          backgroundColor: "#EFF1F8",
          "& .MuiOutlinedInput-notchedOutline": { border: "none" },
        },
      }}
      fullWidth
    />
  );
};

export default ConversationsSearchInput;
