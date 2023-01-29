import { TextField } from "@mui/material";

const CustomTextField = ({ formik, label, name, select, options }) => (
    <TextField
      error={Boolean(formik.touched[name] && formik.errors[name])}
      helperText={formik.touched[name] && formik.errors[name]}
      fullWidth
      label={label}
      name={name}
      onChange={formik.handleChange}
      required
      margin="normal"
      select={select}
      SelectProps={select ? { native: true } : {}}
      value={formik.values[name]}
      variant="outlined"
    >
      {select ? options.map((option) => (
        <option
          key={option.label}
          value={option.label}
        >
          {option.label}
        </option>
      )) : null}
    </TextField>
  );
  
  export default CustomTextField;