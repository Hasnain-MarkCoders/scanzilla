import { Box, FormControl, TextField, Typography } from "@mui/material";
import { forwardRef } from "react";

const CustomTextField = forwardRef(({ label="", rows=4, multiline=false, handleKeyDown=()=>{}, onChange=()=>{}, name="", value="", error="" , mb="0px"}, ref) => {
    return (
      <Box sx={{ mb: mb }}>
        <FormControl variant="standard" fullWidth>
          <TextField
            ref={ref}
            sx={{
              "&:hover": {
                border: "#1e1e20"
              },
              "&:active": {
                border: "#1e1e20"
              }
            }}
            onKeyDown={handleKeyDown}
            name={name}
            label={label}
            onChange={onChange}
            value={value}
            color="secondary"
            InputLabelProps={{
              shrink: true, // This will keep the label on top
            }}
            multiline={multiline}
            rows={rows} // Keep the number of rows the same for all text areas
          />
        </FormControl>
        {error && <Typography sx={{
          background: "whitesmoke",
          p: "10px",
          color: "red",
          mt: "8px",
          wordBreak: "break-all"
        }}>{error}</Typography>}
      </Box>
    );
});

export default CustomTextField;
