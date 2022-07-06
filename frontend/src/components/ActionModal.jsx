import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import ActionForm from "./ActionForm";
import { FaTrashAlt, FaRegEdit, FaRegWindowClose } from "react-icons/fa";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Stack direction="row" spacing={1}>
        <IconButton onClick={handleOpen} aria-label="edit">
          <FaRegEdit />
        </IconButton>
        <IconButton onClick={handleOpen} aria-label="delete">
          <FaTrashAlt />
        </IconButton>
      </Stack>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="modal-form-div">
            <IconButton onClick={handleClose} aria-label="edit">
              <FaRegWindowClose />
            </IconButton>
            <h3 className="form-title">Edit</h3>
          </div>
          <ActionForm />
        </Box>
      </Modal>
    </div>
  );
}
