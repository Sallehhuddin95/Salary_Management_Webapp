import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import ActionForm from "./ActionForm";
import { FaTrashAlt, FaRegEdit, FaRegWindowClose } from "react-icons/fa";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { FaFileUpload } from "react-icons/fa";

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

export default function FileUploader(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const Input = styled("input")({
    display: "none",
  });

  return (
    <div className="uploader-div">
      {/* <Stack direction="row" spacing={1}> */}
      <IconButton onClick={handleOpen} aria-label="upload" size="small">
        <FaFileUpload />
        <span>Upload CSV</span>
      </IconButton>
      {/* </Stack> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="uploader-modal">
          <div>
            <h3 className="form-title">Upload CSV File</h3>
          </div>
          <label htmlFor="contained-button-file" id="Uploader">
            <Input
              accept=".csv"
              id="contained-button-file"
              multiple
              type="file"
            />
            <Button variant="contained" component="span">
              Upload
            </Button>
          </label>
        </Box>
      </Modal>
    </div>
  );
}
