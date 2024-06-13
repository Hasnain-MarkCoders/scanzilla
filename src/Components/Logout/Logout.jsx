import { Box } from "@mui/material";
import { FaPowerOff } from "react-icons/fa";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleSnackAlert } from "../../Redux/Slice/SnackAlertSlice/SnackAlertSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { handleAuth } from "../../Redux/Slice/UserSlice/UserSlice";

const Logout = () => {
  const auth = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleLogout = ()=>{
    dispatch(
        handleSnackAlert({
          open: true,
          message: "Logout successfully.",
          severity: "success",
        })
      );
      navigate("/", {replace:true})
      dispatch(handleAuth({ user: null, token: null, authenticated: false }))
  }
  return (
    <>
      {auth?.authenticated ? (
        <Box
        onClick={handleLogout}
          sx={{
            fontSize: "clamp(1vw, 2rem, 10vw)",
            cursor:"pointer"
          }}
        >
          <FaPowerOff />
        </Box>
      ) : null}
    </>
  );
};

export default Logout;
