import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import ActionForm from "./ActionForm";
import { FaTrashAlt, FaRegEdit, FaRegWindowClose } from "react-icons/fa";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { useDispatch } from "react-redux";
import {
  deleteEmployee,
  employeeSlice,
} from "../features/employee/employeeSlice";

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
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
    setDel(false);
  };

  const [del, setDel] = useState(false);

  const closeAction = () => {
    setDel(true);
    setOpen(true);
  };

  const handleDelete = () => {
    console.log(props.id);
    dispatch(deleteEmployee(props.id));
    setOpen(false);
  };

  return (
    <div>
      <Stack direction="row" spacing={1}>
        <IconButton onClick={handleOpen} aria-label="edit">
          <FaRegEdit />
        </IconButton>
        <IconButton onClick={closeAction} aria-label="delete">
          <FaTrashAlt />
        </IconButton>
      </Stack>
      {del ? (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="modal-form-div">
              {/* <IconButton onClick={handleClose} aria-label="edit">
                <FaRegWindowClose />
              </IconButton> */}
              <h3 className="form-title">Delete Employee</h3>
            </div>
            <p>Are you sure to delete this employee?</p>
            <div className="btn-group">
              <Button onClick={handleDelete} variant="contained">
                Yes
              </Button>
              <Button onClick={handleClose} variant="contained">
                No
              </Button>
            </div>
          </Box>
        </Modal>
      ) : (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="modal-form-div">
              {/* <IconButton onClick={handleClose} aria-label="edit">
                <FaRegWindowClose />
              </IconButton> */}
              <h3 className="form-title">Edit Details</h3>
            </div>
            <ActionForm id={props.id} />
          </Box>
        </Modal>
      )}
    </div>
  );
}
