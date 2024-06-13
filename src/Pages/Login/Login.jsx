import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import backgrund from "./../../assets/images/login logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { handleSnackAlert } from "../../Redux/Slice/SnackAlertSlice/SnackAlertSlice";
import CustomTextField from "../../Components/CustomInputField/CustomInputField";
import { LoginUser } from "../../Endpoints/Endpoints";
import { handleAuth } from "../../Redux/Slice/UserSlice/UserSlice";
import axiosInstance from "./../../Hooks/useQueryGallery/AuthHook/AuthHook";
import Loader from "../../Components/Loader/Loader";

const appUrl= import.meta.env.VITE_REACT_APP_API_URL
const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false)
  const auth = useSelector((state) => state.auth);
  const inputRef = useRef(null)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (auth?.authenticated) {
    // dispatch(handleSnackAlert({open:true, message:"Logout first.", severity:"error"}))
    return <Navigate to="/text-analyze" replace={true} />;
  }

  const handleInput = (e) => {
    setData((prev) => ({ ...prev, [e?.target?.name]: e?.target?.value }));
  };
  const handleLogin = async () => {
    setIsLoading(true)

    setErrors({password:"",email:""})

    try {
      let response = await axiosInstance({url:appUrl+"/login", method:"post", data:data});
      response = response?.data
      console.log(response)
        const responseData = {
          user: response?.user,
          accessToken: response?.accessToken,
          refreshToken: response?.refreshToken,
          authenticated: true,
        };
        dispatch(handleAuth(responseData));
        dispatch(
          handleSnackAlert({
            open: true,
            message: response.message,
            severity: "success",
          })
        );
        setIsLoading(false)

        navigate("/text-analyze");
        sessionStorage.setItem("accessToken", response?.accessToken);
        sessionStorage.setItem("refreshToken", response?.refreshToken);
     
    } catch (error) {
      const errorData = error.response.data
      if(error.response.data.errorType.includes("email")){
        setErrors({password:"",email:error.response.data.message})
      }
      if(error.response.data.errorType.includes("password")){
        setErrors({email:"",password:error.response.data.message})
      }
      setIsLoading(false)

      return dispatch(
        handleSnackAlert({
          open: true,
          message: errorData?.message,
          severity: "error",
        })
      );

    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };
  useEffect(()=>{
    inputRef?.current?.focus()
  },[])
  return (
    <Box
      sx={{
        boxSizing: "border-box",
        m: {
          sm: "50px auto",
          md: "auto",
        },
        width: {
          xs: "90vw",
          sm: "60vw",
          md: "80%",
        },
        height: {
          xs: "auto",
          md: "auto",
        },

        p: {
          xs: "50px 30px",
          sm: "50px 50px",
          md: "100px 50px",
        },
        maxWidth: "1200px",
        margin: "0 auto",
        background: "white",
        borderRadius: {
          xs: "50px",
        },
        gap: "50px",
        display: "flex",
        flexDirection: {
          md: "row",
          xs: "column",
        },
      }}
    >
      <Box
        sx={{
          flexBasis: {
            xs: "50%",
          },
          flexShrink: "1",
          flexGrow: "1",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "50px",
          }}
        >
          <Typography
            sx={{
              fontFamily: "clashdisplay",
              color: "#010115",
              lineHeight: "36.9px",
              fontSize: "30px",
              fontWeight: "600",
            }}
          >
            Login
          </Typography>

          <CustomTextField
          ref={inputRef}
          handleKeyDown={handleKeyDown}
            error={errors?.email}
            onChange={handleInput}
            name={"email"}
            value={data.email}
            rows={1}
            label="Email"
          />
          <CustomTextField
          handleKeyDown={handleKeyDown}
            error={errors?.password}
            onChange={handleInput}
            name={"password"}
            value={data.password}
            rows={1}
            label="Password"
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
              width:"100%",
              fontSize: "18px",
              fontWeight: "500",
              "&:hover": {
                background: "#1e1e20",
              },
            }}
            variant="contained"
            handleKeyDown={(e) => console.log(e)}
            onClick={handleLogin}
          >
            Login
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
            md: "flex",
            xs: "none",
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
            width: "200px",
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
          Check Your Daily Timing
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
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia quam
          atque, iusto saepe ad nobis dolore.
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
