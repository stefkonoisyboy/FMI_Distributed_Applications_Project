import React from "react";
import { InputAdornment, TextField } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { setQuery } from "../../store/slices/contactSlice";

const ContactSearch = () => {
  // General hooks
  const dispatch = useDispatch();

  // Handlers
  const handleChange = (e) => {
    const newQuery = e.target.value;
    dispatch(setQuery(newQuery));
  };

  return (
    <TextField
      placeholder="Search"
      id="outlined-start-adornment"
      onChange={handleChange}
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

export default ContactSearch;
