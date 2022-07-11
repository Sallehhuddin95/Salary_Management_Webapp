import React, { useState } from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { FaSearch } from "react-icons/fa";
import { Button } from "@mui/material";

export default function FilterBox() {
  const [min, setMin] = useState();
  const [max, setMax] = useState();

  const handleFilter = () => {};
  return (
    <Box sx={{ "& > :not(style)": { m: 1 } }}>
      <Box
        sx={{ display: "flex", alignItems: "flex-end" }}
        className="filter-div"
      >
        <TextField
          id="MinSalary"
          className="salary-input"
          label="Minimum salary"
          multiline
          placeholder="Enter amount"
          value={min}
          onChange={(e) => setMin(e.target.value)}
        />
        <TextField
          id="MaxSalary"
          className="salary-input"
          label="Maximum salary"
          multiline
          placeholder="Enter amount"
          value={max}
          onChange={(e) => setMax(e.target.value)}
        />
        <Button
          id="SearchBtn"
          className="search-btn"
          variant="contained"
          onClick={handleFilter}
        >
          <FaSearch sx={{ color: "action.active", mr: 1, my: 0.5 }} />
        </Button>
      </Box>
      {/* <Box sx={{ display: "flex", alignItems: "flex-end" }}> */}
      {/* <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} /> */}

      {/* </Box> */}
    </Box>
  );
}
