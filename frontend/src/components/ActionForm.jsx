import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { updateEmployee } from "../features/employee/employeeSlice";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

function ActionForm(props) {
  const { employees, isLoading, isError, message } = useSelector(
    (state) => state.employees
  );

  const employee = employees.filter((employee) => employee._id === props.id);
  console.log(employee[0].name);

  const [name, setName] = useState(employee[0].name);
  const [login, setLogin] = useState(employee[0].login);
  const [salary, setSalary] = useState(employee[0].salary);
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateEmployee({
        name,
        login,
        salary,
        id: props.id,
      })
    );
  };
  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <form className="form" onSubmit={handleSubmit}>
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
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Save
          </Button>
        </div>
      </form>
    </Box>
  );
}

export default ActionForm;
