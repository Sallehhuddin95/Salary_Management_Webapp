import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import {
  updateEmployee,
  createEmployees,
  getEmployees,
} from "../features/employee/employeeSlice";
import Papa from "papaparse";
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
  const [disable, setDisable] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const Input = styled("input")({
    display: "none",
  });

  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  // State to store parsed data
  const [parsedData, setParsedData] = useState([]);

  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);

  //State to store the values
  const [values, setValues] = useState([]);

  const dispatch = useDispatch();

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];

        // Iterating data to get column name and their values
        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        // Parsed Data Response in array format
        setParsedData(results.data);

        // Filtered Column Names
        setTableRows(rowsArray[0]);

        // Filtered Values
        setValues(valuesArray);
        // console.log(parsedData);
        setDisable(false);
      },
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    parsedData.map((data) => {
      console.log(data.Id);
      dispatch(
        createEmployees({
          userID: data.Id,
          name: data.name,
          login: data.login,
          salary: data.salary,
        })
      );
      dispatch(getEmployees());
    });

    setIsFilePicked(true);
    setOpen(false);
    // setSelectedFile();
  };

  const handleClear = (e) => {
    setIsFilePicked(false);
    setSelectedFile();
    setDisable(true);
  };

  return (
    <div className="uploader-div">
      {/* <Stack direction="row" spacing={1}> */}
      <IconButton onClick={handleOpen} aria-label="upload" size="small">
        <FaFileUpload />
        <span className="mx-3">Upload CSV File</span>
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
            className="close-btn mt-2"
            onClick={handleClose}
            aria-label="close"
            size="small"
          >
            <FaRegWindowClose />
          </IconButton>
          <div>
            <h5 className="form-title my-3">Upload a CSV File</h5>
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
              <Button
                variant="contained"
                onClick={handleSave}
                disabled={disable}
              >
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
