import { Box, FormControl, TextField, Typography } from "@mui/material";
import { forwardRef } from "react";

const CustomTextField = forwardRef(({ 
  type = "text",
  rows = 4,
  multiline = false,
  handleKeyDown = () => {},
  onChange = () => {},
  name = "",
  value = "",
  error = "",
  mb = "0px"
}, ref) => {
  return (
    <Box sx={{ mb: mb }}>
      <FormControl variant="standard" fullWidth>
        <TextField
          type={type}
          ref={ref}
          sx={{
            borderRadius: "12px", // Setting borderRadius to 12px
            height: "56px", // Setting height to 56px
            '& .MuiOutlinedInput-root': { // Override styles for MuiOutlinedInput
              borderRadius: "12px",
              border: "1px solid rgba(102, 102, 102, 0)", // Default border color and style
              // '&:hover': {
              //   border: "1px solid #1e1e20", // Custom border color on hover
              // },
              // '&.Mui-focused': {
              //   border: "1px solid #1e1e20", // Custom border color when focused
              // },
            },
          }}
          onKeyDown={handleKeyDown}
          name={name}
          onChange={onChange}
          value={value}
          color="secondary"
          InputLabelProps={{
            shrink: true, // This will keep the label on top
          }}
          multiline={multiline}
          rows={rows}
        />
      </FormControl>
      {error && (
        <Typography sx={{
          background: "whitesmoke",
          p: "10px",
          color: "red",
          mt: "8px",
          wordBreak: "break-word"
        }}>
          {error}
        </Typography>
      )}
    </Box>
  );
});

export default CustomTextField;
