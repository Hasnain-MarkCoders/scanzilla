import { Box } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import backgrund from "./../../assets/images/background.svg"
import { useDispatch, useSelector } from "react-redux";
import SnackAlert from "./../../Components/SnackAlert/SnackAlert"
import { handleSnackAlert } from "../../Redux/Slice/SnackAlertSlice/SnackAlertSlice";
const Layout = () => {
  const auth = useSelector(state=>state?.auth)
  const snackAlert = useSelector(state=> state?.snackAlert)
  const dispatch = useDispatch()
  const handleCloseSnackAlert=()=>{
    dispatch(handleSnackAlert( {
      open:false,
  }))
}
  return (
    <Box sx={{
      background:`url(${backgrund})`,
      width:"100%",
      height:"100%",
      minHeight:"100dvh",
      p:"50px",
      backgroundSize:"cover",
      backgroundPosition:"center",
      backgroundRepeat:"no-repeat",
      display:"grid",
      placeContent:"center"
    }}>
       <Outlet/>
      <SnackAlert open={snackAlert?.open} message={snackAlert.message} severity={snackAlert?.severity} handleClose={handleCloseSnackAlert}/>

    </Box>
  )
}

export default Layout