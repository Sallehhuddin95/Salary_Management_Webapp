import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import { FaFileUpload, FaRegWindowClose } from "react-icons/fa";

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

  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const handleSave = (event) => {};
  const handleClear = (event) => {
    setIsFilePicked(false);
    setSelectedFile();
  };

  const handleSubmission = () => {
    const formData = new FormData();

    formData.append("File", selectedFile);

    fetch("https://freeimage.host/api/1/upload?key=<YOUR_API_KEY>", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

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
          <IconButton
            className="close-btn"
            onClick={handleClose}
            aria-label="close"
            size="small"
          >
            <FaRegWindowClose />
          </IconButton>
          <div>
            <h5 className="form-title">Upload a CSV File</h5>
          </div>
          <label htmlFor="contained-button-file" id="Uploader">
            <Input
              accept=".csv"
              id="contained-button-file"
              multiple
              type="file"
              onChange={changeHandler}
            />
            {isFilePicked ? (
              <div className="upload-btn-div">
                <p>Filename: {selectedFile.name}</p>
                <p>Filetype: {selectedFile.type}</p>
                <p>Size in bytes: {selectedFile.size}</p>
                <p>
                  lastModifiedDate:{" "}
                  {selectedFile.lastModifiedDate.toLocaleDateString()}
                </p>
              </div>
            ) : (
              <div className="upload-btn-div">
                <span className="upload-btn-text">
                  Click here to upload a file
                </span>
                <FaFileUpload />
              </div>
            )}
            {/* <Button
              variant="contained"
              component="span"
              onClick={handleSubmission}
            >
              Upload
            </Button> */}
            <div className="mt-3 upload-btn-group">
              <Button variant="contained" onClick={handleSave}>
                Save
              </Button>
              <Button variant="contained" onClick={handleClear}>
                Clear
              </Button>
            </div>
          </label>
        </Box>
      </Modal>
    </div>
  );
}
