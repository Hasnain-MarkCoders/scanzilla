import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import backgrund from "./../../assets/images/robot.svg";
import Logout from "../../Components/Logout/Logout";
import axiosInstance from "../../Hooks/useQueryGallery/AuthHook/AuthHook";
import { handleSnackAlert } from "../../Redux/Slice/SnackAlertSlice/SnackAlertSlice";
import { useDispatch } from "react-redux";
import Loader from "../../Components/Loader/Loader";
import CustomTextField from "../../Components/CustomInputField/CustomInputField";

const appUrl= import.meta.env.VITE_REACT_APP_API_URL


const Home = () => {
  const [data, setData] = useState({
    title: "",
    bulletpoints: "",
    description: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    bulletpoints: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false)
  const handleData = (errorsData)=>{
const errors = errorsData.message.map(error=>(setErrors(prev=>({...prev,[error.path[0]]:error.message}))))


  }
  const dispatch = useDispatch()
  const hanldeInput = (e) => {
    setData((prev) => ({ ...prev, [e?.target?.name]: e?.target?.value }));
  };

  const handleAnalyze = async () => {
    setIsLoading(true)
    setErrors({ title: "", bulletpoints: "", description: "" });
    try {
      const response = await axiosInstance({
        url: appUrl + "/verifyText",
        method: "post",
        data: data,
      });
    setIsLoading(false)
      handleData(response.data)
      dispatch(
        handleSnackAlert({
          open: true,
          message: response?.message,
          severity: "success",
        })
      );
      
    } catch (error) {
      const errorData = error?.response?.data;
    setIsLoading(false)

      return dispatch(
        handleSnackAlert({
          open: true,
          message: errorData?.message,
          severity: "error",
        })
      );
    }
    setIsLoading(false)

  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAnalyze();
    }
  };
  return (
    <Box
      sx={{
        boxSizing: "border-box",
        m: {
          md: "auto",
        },
        width: {
          xs: "90vw",
          sm: "60vw",
          md: "80vw",
        },
        height: {
          xs: "auto",
          md: "auto",
        },
        p: {
          sm: "80px 30px 30px 30px",
          md: "60px",
          xs: "80px 20px 20px 20px",
        },
        maxWidth: "1200px",
        margin: "0 auto",
        background: "white",
        borderRadius: {
          sm: "30px",
          md: "50px",
          xs: "20px",
        },
        gap: "50px",
        display: "flex",
        flexDirection: {
          md: "row",
          xs: "column",
        },
        position: "relative",
      }}
    >
      <Box sx={{ position: "absolute", top: "30px", right: "30px" }}>
        <Logout />
      </Box>
      <Box
        sx={{
          flexBasis: {
            md: "50%",
            xs: "100%",
          },
          flexGrow: "0",
          flexShrink: "1",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: {
              md: "20px",
              xs: "5px",
            },
          }}
        >
          <CustomTextField
          handleKeyDown={handleKeyDown}
            mb="20px"
            error={errors?.title}
            onChange={hanldeInput}
            name={"title"}
            value={data.title}
            rows={1}
            label="Add Title"
          />
          <CustomTextField
          handleKeyDown={handleKeyDown}
            mb="20px"
        multiline={true}

            error={errors?.bulletpoints}
            onChange={hanldeInput}
            name={"bulletpoints"}
            value={data?.bulletpoints}
            label="Add Bullet Points"
          />
          <CustomTextField
        multiline={true}

          handleKeyDown={handleKeyDown}
            mb="20px"
            error={errors?.description}
            onChange={hanldeInput}
            name={"description"}
            value={data?.description}
            rows={8}
            label="Add Description"
          />
          <Box sx={{
            position:"relative"
          }}>
           
         { isLoading?<Box sx={{
            position:"absolute",
            background:"black",

            height:"100%",
            width:"100%",
            display:"grid",
            placeContent:"center",
            borderRadius: "10px",
            zIndex:2
          }}>
          <Loader/>
          </Box>:null}

          <Button
            sx={{
              p: "15px 20px",
              borderRadius: "10px",
              background: "#010115",
              fontSize: "18px",
              fontWeight: "500",
              width:"100%",
              "&:hover": {
                background: "#1e1e20",
              },
            }}
            variant="contained"
            onClick={handleAnalyze}
          >
            Analyze{" "}
          </Button>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          flexBasis: {
            xs: "50%",
          },
          flexShrink: "1",
          display: {
            xs: "none",
            md: "flex",
          },
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "30px",
        }}
      >
        <Box
          sx={{
            background: `url(${backgrund})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            width: "300px",
            height: "200px",
          }}
        ></Box>
        <Typography
          sx={{
            fontFamily: "clashdisplay",
            color: "#010115",
            lineHeight: "30.75px",
            fontSize: "25px",
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          ScanZilla AI
        </Typography>
        <Typography
          sx={{
            fontFamily: "Segoe",
            color: "#808285",
            textAlign: "center",
            lineHeight: "30.75px",
            fontSize: "20px",
            fontWeight: "400",
          }}
        >
          EBC A+ brakes deliver exceptional durability, reliable performance, and superior safety for confident driving in all conditions.
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;
