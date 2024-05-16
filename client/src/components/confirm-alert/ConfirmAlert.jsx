import { DeleteOutlineOutlined } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

const ConfirmAlert = ({
  open,
  handleClose,
  handleAction,
  title,
  content,
  cancelButtonText,
  confirmButtonText,
}) => {
  return (
    <Dialog
      sx={{
        ".MuiPaper-root": {
          paddingBlock: "24px",
          borderRadius: "28px",
          backgroundColor: "#F3F4F9",
        },
      }}
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DeleteOutlineOutlined sx={{ color: "#1B72C0", margin: "auto" }} />
      <DialogTitle id="alert-dialog-title" textAlign="center">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          sx={{ color: "#1B72C0", textTransform: "unset" }}
        >
          {cancelButtonText}
        </Button>
        <Button
          onClick={() => {
            handleAction();
            handleClose();
          }}
          sx={{ color: "#1B72C0", textTransform: "unset" }}
          autoFocus
        >
          {confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmAlert;
