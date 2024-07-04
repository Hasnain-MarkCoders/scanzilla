import { Box, Button, FormControl, TextField, Typography, Checkbox } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import background from "../../assets/images/LoginImg.png";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { handleSnackAlert } from "../../Redux/Slice/SnackAlertSlice/SnackAlertSlice";
import CustomTextField from "../../Components/CustomInputField/CustomInputField";
import { LoginUser } from "../../Endpoints/Endpoints";
import { handleAuth } from "../../Redux/Slice/UserSlice/UserSlice";
import axiosInstance from "./../../Hooks/useQueryGallery/AuthHook/AuthHook";
import Loader from "../../Components/Loader/Loader";
import LoaderW from "../../Components/Loader/LoaderW";
import GoogleIcon from '../../assets/images/googleIcon.png'
import { blue } from '@mui/material/colors';
import { NavLink } from "react-router-dom";

const appUrl = import.meta.env.VITE_REACT_APP_API_URL
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

    setErrors({ password: "", email: "" })
    if (data?.email === "" && data?.password === "") {
      setIsLoading(false)
      return setErrors({ password: "Password can not be empty", email: "Email can not be empty" })

    }
    if (data?.email === "") {
      setIsLoading(false)
      return setErrors({ password: "", email: "Email can not be empty" })
    }
    if (data?.password === "") {
      setIsLoading(false)
      return setErrors({ password: "Password can not be empty", email: "" })
    }


    try {
      let response = await axiosInstance({ url: appUrl + "/login", method: "post", data: data });
      response = response?.data
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
      if (error.response.data.errorType.includes("email")) {
        setErrors({ password: "", email: error.response.data.message })
      }
      if (error.response.data.errorType.includes("password")) {
        setErrors({ email: "", password: error.response.data.message })
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

  const handlekeydown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };
  useEffect(() => {
    inputRef?.current?.focus()
  }, [])
  return (
    <Box
      sx={{
        boxSizing: "border-box",
        // m: {
        //   sm: "50px auto",
        //   md: "auto",
        // },
        fontFamily: "Poppins",
        width: {
          xs: "100vw",
          sm: "100vw",
          md: "100%",
        },
        height: {
          height: "100vh",
        },

        p: {
          // xs: "50px 30px",
          // sm: "50px 50px",
          md: "20px 20px",
        },
        maxWidth: "1440px",
        margin: "0 auto",
        // background: "blue",
        
        display: "flex",
        justifyContent: "space-between",
        flexDirection: {
          md: "row",
          xs: "column",
        },
        minWidth: {
          md: "400px"
        }
      }}
    >
      <Box
        sx={{
          flexBasis: {
            xs: "50%",
          },
          flexShrink: "1",
          flexGrow: "0",
          p: {
            // lg: "80px 130px",
            md: "80px 50px",
            xs: "80px 50px"

          }
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px"
            }}
          >


            <Typography
              sx={{

                color: "#1B004D",
                lineHeight: "36.9px",
                fontSize: "40px",
                fontWeight: "600",
              }}
            >
              Sign in
            </Typography>
            <Typography
              sx={{
                color: "#A0A4A9",
                fontSize: "1rem",
                fontWeight: "400",
              }}
            >
              Welcome back! Please enter your details.
            </Typography>
          </Typography>
          <Box
          sx={{
            display:"flex",
            flexDirection:"column",
            gap:"30px"
          }}
          >
          <Typography
            sx={{
              display: "flex",
              gap: "5px",
              flexDirection: "column",
              marginTop: "50px"
            }}
          >

            <label
              style={{
                color: "#666666",
                fontWeight: "400"
              }}
            >Email</label>
            <CustomTextField
              ref={inputRef}
              handlekeydown={handlekeydown}
              error={errors?.email}
              onChange={handleInput}
              name={"email"}
              value={data.email}
              rows={1}
            />
          </Typography>
          <Typography
            sx={{
              display: "flex",
              gap: "5px",
              flexDirection: "column",
            }}
          >
            <label
              style={{
                color: "#666666",
                fontWeight: "400"
              }}
            >Password</label>
            <CustomTextField
              handlekeydown={handlekeydown}
              error={errors?.password}
              onChange={handleInput}
              name={"password"}
              type="password"
              value={data.password}
              rows={1}
            />
          </Typography>
          </Box>
          <Box
            sx={{
              // display: "flex",
              display: "none  ",
              alignItems: "center",
              justifyContent: "space-between",

            }}
          >
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",

              }}
            >
              <Checkbox
                sx={{
                  color: blue[800], // set the color of the checkbox
                  '&.Mui-checked': {
                    color: blue[900], // set the color when checked
                  },
                }}
              />
              <p
                style={{
                  color: "#333333",
                  fontWeight: "400",
                  fontSize: "16px"
                }}
              >Remember Me</p>
            </Typography>
            <Typography
              sx={{
                color: "#333333",
                fontWeight: "400",
              }}
            >Forgot Password</Typography>
          </Box>
          <Box sx={{
            position: "relative",
            marginTop: "80px",
            display: "flex",
            flexDirection: "column",
            gap: "1.56rem",
            // border:"2px solid red"
          }}>
            <Button
              sx={{
                p: "15px 20px",
                borderRadius: "10px",
                background: "linear-gradient(to right, #1A0049, #41016C)",
                width: "100%",
                height: "56px",
                borderRadius: "32px",
                fontSize: {
                  xs:"14px",
                  sm:"18px"
                },
                fontWeight: "500",
                textTransform: "none",
                transition: "background 0.9s ease, color 0.4s ease",
                "&:hover": {
                  background: "linear-gradient(to right, #1G1947, #41016C)",
                  color: "white"
                },
                boxShadow: "none"
              }}
              variant="contained"
              onClick={handleLogin}
            >
              {isLoading ? <LoaderW /> : "Sign in"}
            </Button>

            <Button
              sx={{
                p: "15px 20px",
                borderRadius: "10px",
                background: "white",
                width: "100%",
                height: "56px",
                borderRadius: "32px",
                fontSize: {
                  xs:"14px",
                  sm:"18px"
                },
                fontWeight: "500",
                textTransform: "none",
                transition: "background 0.9s ease, color 0.4s ease",
                "&:hover": {
                  background: "linear-gradient(to right, #1A0049, #41016C)",
                  color: "white"
                },
                boxShadow: "none",
                border: "1px solid grey",
                color: "black"
              }}
              variant="contained"
              // onClick={handleLogin}
            >
              <span style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                <img src={GoogleIcon} alt="Google Icon" style={{ height: "40px" }} />
                <span>Sign in With Google</span>
              </span>
            </Button>
          </Box>
          <Box
          
          sx={{
            display:"flex",
            // border:"2px solid red",
            alignItems:"center",
            gap:"4px",
            justifyContent:"center",
            marginTop:"40px"
          }}>
            <Typography
            sx={{
              fontSize: {
                xs:"12px",
                sm:"18px"
              },
              color:"#A0A4A9",
            }}
            >Don’t have an account? </Typography>
            <Typography
            sx={{
              color:"#1E004D",
              textDecoration:"none"
            }}
            ><NavLink to='#'
            style={{
              color:"#1E004D",
              fontWeight:"600",
              
            }}
            >Sign Up</NavLink></Typography>
          </Box>

        </Box>
      </Box>
      <Box
        sx={{
          flexBasis: {
            lg:"600px",
            md: "450px"

          },
          flexShrink: 0,
          flexGrow:0,
          display: {
            xs: "none",
            md: "block",
          },
          
        }}
      >
       
        <img
          style={{
            width: "100%",
            height: "100%"
          }}
          src={background} alt="" />

      </Box>
    </Box>
  );
};

export default Login;
