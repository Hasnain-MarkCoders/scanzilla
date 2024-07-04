import { Box } from "@mui/material";
import {Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SnackAlert from "./../../Components/SnackAlert/SnackAlert"
import { handleSnackAlert } from "../../Redux/Slice/SnackAlertSlice/SnackAlertSlice";
const Layout = () => {
  const snackAlert = useSelector(state=> state?.snackAlert)
  const dispatch = useDispatch()
  const handleCloseSnackAlert=()=>{
    dispatch(handleSnackAlert( {
      open:false,
  }))
}
  return (
    <Box sx={{
      background:"white",
      width:"100%",
      height:"100%",
      minHeight:"100dvh",
      backgroundSize:"cover",
      backgroundPosition:"center",
      backgroundRepeat:"no-repeat",
     
      
    }}>
       <Outlet/>
      <SnackAlert open={snackAlert?.open} message={snackAlert.message} severity={snackAlert?.severity} handleClose={handleCloseSnackAlert}/>

    </Box>
  )
}

export default Layout