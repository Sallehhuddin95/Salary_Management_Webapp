import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEmployees, reset } from "../features/employee/employeeSlice";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { FaSearch } from "react-icons/fa";
import { Button } from "@mui/material";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { FaTrashAlt, FaRegEdit } from "react-icons/fa";
import ActionModal from "./ActionModal";

const MinSalary = 2000;
const MaxSalary = 7000;

function EmployeeTable(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box
      sx={{
        flexShrink: 0,
        ml: 2.5,
        width: {
          xs: 90, // theme.breakpoints.up('xs')
          sm: 200, // theme.breakpoints.up('sm')
          md: 300, // theme.breakpoints.up('md')
          lg: 400, // theme.breakpoints.up('lg')
          xl: 500, // theme.breakpoints.up('xl')
        },
      }}
    >
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

EmployeeTable.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function CustomPaginationActionsTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const dispatch = useDispatch();
  const [min, setMin] = useState();
  const [max, setMax] = useState();
  const { employees, isLoading, isError, message } = useSelector(
    (state) => state.employees
  );

  const [filteredEmployee, setFilteredEmployee] = useState(employees);

  const handleFilter = () => {
    var filterEmployee;
    if (min && max) {
      filterEmployee = employees.filter(
        (employee) => employee.salary <= max && employee.salary >= min
      );
    } else if (min && !max) {
      filterEmployee = employees.filter((employee) => employee.salary >= min);
    } else if (max && !min) {
      filterEmployee = employees.filter((employee) => employee.salary <= max);
    } else {
      filterEmployee = employees;
    }

    setFilteredEmployee(filterEmployee);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - employees.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
    <>
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
      <TableContainer component={Paper}>
        <Table aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              {" "}
              <TableCell component="th" scope="row">
                Id
              </TableCell>
              <TableCell component="th" scope="row">
                Name
              </TableCell>
              <TableCell component="th" scope="row">
                Login
              </TableCell>
              <TableCell component="th" scope="row">
                Salary
              </TableCell>
              <TableCell component="th" scope="row">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? filteredEmployee.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : filteredEmployee
            ).map((employee) => (
              <TableRow key={employee.name}>
                <TableCell>{employee.userID}</TableCell>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.login}</TableCell>
                <TableCell>${employee.salary}</TableCell>
                <TableCell>
                  <ActionModal id={employee._id} />
                  {/* <Button>
                  <ActionModal />
                  <FaRegEdit />
                </Button>
                <Button>
                  <ActionModal />
                  <FaTrashAlt />
                </Button> */}
                </TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={employees.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={EmployeeTable}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}
