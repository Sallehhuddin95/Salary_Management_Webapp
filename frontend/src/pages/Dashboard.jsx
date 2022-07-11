import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEmployees, reset } from "../features/employee/employeeSlice";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Sidebar from "../components/Sidebar";
import EmployeeTable from "../components/EmployeeTable";
import FilterBox from "../components/FilterBox";

const drawerWidth = 240;

export default function Dashboard() {
  const dispatch = useDispatch();

  const { employees, isLoading, isError, message } = useSelector(
    (state) => state.employees
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    // get goals from backend and put in the goals variable
    console.log("get employees");
    dispatch(getEmployees());

    //Reset the goals when we leave the page
    return () => {
      dispatch(reset());
    };
  }, [isError, dispatch]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Sidebar />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        {/* <Toolbar /> */}
        {/* <FilterBox /> */}
        <h2>Employees</h2>
        <EmployeeTable />
      </Box>
    </Box>
  );
}
