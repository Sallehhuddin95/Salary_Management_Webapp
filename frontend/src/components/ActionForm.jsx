import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

function ActionForm(props) {
  const handleSubmit = (e, action) => {};
  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <form className="form" onSubmit={handleSubmit}>
        <TextField className="mt-2" label="Name" type="text" fullWidth />
        <TextField className="mt-2" label="Login" type="text" fullWidth />
        <TextField className="mt-2" label="Salary" type="text" fullWidth />
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
