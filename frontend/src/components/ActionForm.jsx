import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

function GoalForm(props) {
  const onSubmit = (e, action) => {};
  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <form className="form">
        <TextField className="mt-2" label="Name" type="text" fullWidth />
        <TextField className="mt-2" label="Login" type="text" fullWidth />
        <TextField className="mt-2" label="Salary" type="text" fullWidth />
      </form>

      <div className="mt-3">
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Save
        </Button>
      </div>
    </Box>
  );
}

export default GoalForm;
