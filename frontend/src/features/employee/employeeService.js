import axios from "axios";

const API_URL = "/api/employees/";

//Create new employees

const createEmployees = async (employeeData) => {
  const response = await axios.post(API_URL, employeeData);

  console.log("data create: " + employeeData);

  return response.data;
};

//Get employees

const getEmployees = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};

//Delete employee

const deleteEmployee = async (employeeID) => {
  const response = await axios.delete(API_URL + employeeID);
  console.log("data delete: " + response.data);

  return response.data;
};

//Update employee

const updateEmployee = async (employeeUpdate) => {
  const employeeId = employeeUpdate.id;
  console.log("data update: " + employeeId);
  const response = await axios.put(
    API_URL + employeeId,
    {
      name: employeeUpdate.name,
      login: employeeUpdate.login,
      salary: employeeUpdate.salary,
    }
    // config
  );

  return response.data;
};

const employeeService = {
  createEmployees,
  getEmployees,
  deleteEmployee,
  updateEmployee,
};

export default employeeService;
