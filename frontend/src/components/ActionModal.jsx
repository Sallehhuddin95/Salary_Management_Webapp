import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import { FaTrashAlt, FaRegEdit } from "react-icons/fa";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import { getEmployees } from "../features/employee/employeeSlice";
import {
  deleteEmployee,
  updateEmployee,
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
  const { employees } = useSelector((state) => state.employees);

  const employee = employees.filter((employee) => employee._id === props.id);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(employee[0].name);
  const [login, setLogin] = useState(employee[0].login);
  const [salary, setSalary] = useState(employee[0].salary);
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

  // delete and update data
  const handleDelete = () => {
    console.log(props.id);
    dispatch(deleteEmployee(props.id));
    dispatch(getEmployees());
    setOpen(false);
  };

  // edit and update data
  const handleEdit = (e) => {
    e.preventDefault();
    dispatch(
      updateEmployee({
        name,
        login,
        salary,
        id: props.id,
      })
    );
    dispatch(getEmployees());
    setOpen(false);
  };

  const handleCancel = () => {
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
              <h3 className="form-title my-3">Delete Employee</h3>
            </div>
            <p>Are you sure to delete this employee?</p>
            <div className="mt-3">
              <Button onClick={handleDelete} variant="contained" fullWidth>
                Yes
              </Button>
              <Button
                className="mt-3"
                onClick={handleClose}
                variant="contained"
                fullWidth
              >
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
              <h3 className="form-title my-3">Edit Details</h3>
            </div>
            <Box sx={{ flexShrink: 0, ml: 2.5 }}>
              <form className="form" onSubmit={handleEdit}>
                <TextField
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  className="mt-2"
                  label="Name"
                  type="text"
                  fullWidth
                />
                <TextField
                  onChange={(e) => setLogin(e.target.value)}
                  value={login}
                  className="mt-2"
                  label="Login"
                  type="text"
                  fullWidth
                />
                <TextField
                  onChange={(e) => setSalary(e.target.value)}
                  value={salary}
                  className="mt-2"
                  label="Salary"
                  type="text"
                  fullWidth
                />
                <div className="mt-3">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Save
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={handleCancel}
                    fullWidth
                    className="mt-3"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Box>
          </Box>
        </Modal>
      )}
    </div>
  );
}
