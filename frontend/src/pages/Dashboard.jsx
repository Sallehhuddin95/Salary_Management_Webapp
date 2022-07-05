import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Sidebar from "../components/Sidebar";
import EmployeeTable from "../components/EmployeeTable";
import FilterBox from "../components/FilterBox";

const drawerWidth = 240;

export default function Dashboard() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Sidebar />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        {/* <Toolbar /> */}
        <FilterBox />
        <h2>Employees</h2>
        <EmployeeTable />
      </Box>
    </Box>
  );
}
