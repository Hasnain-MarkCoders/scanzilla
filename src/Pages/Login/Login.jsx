import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import backgrund from "./../../assets/images/login logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { handleSnackAlert } from "../../Redux/Slice/SnackAlertSlice/SnackAlertSlice";
import CustomTextField from "../../Components/CustomInputField/CustomInputField";
import { LoginUser } from "../../Endpoints/Endpoints";
import { handleAuth } from "../../Redux/Slice/UserSlice/UserSlice";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (auth?.authenticated) {
    // dispatch(handleSnackAlert({open:true, message:"Logout first.", severity:"error"}))
    return <Navigate to="/text-analyze" replace={true} />;
  }

  const hanldeInput = (e) => {
    setData((prev) => ({ ...prev, [e?.target?.name]: e?.target?.value }));
  };
  const handleErrors = (errors = {}) => {
    console.log(errors);
    const errorData = [];
    for (let key in errors) {
      if (errors[key]) {
        errorData.push({ key: errors[key] });
        setErrors((prev) => ({ ...prev, [key]: errors[key] }));
      }
    }
  };
  useEffect(() => {
    handleErrors(data);
    console.log(errors);
  }, [data]);
  const hanldeLogin = async () => {
    try {
      const response = await LoginUser(data);
      console.log(response);
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
      navigate("/text-analyze");
      sessionStorage.setItem("accessToken", response?.accessToken);
      sessionStorage.setItem("refreshToken", response?.refreshToken);
    } catch (error) {
      return dispatch(
        handleSnackAlert({
          open: true,
          message: error.message,
          severity: "error",
        })
      );
    }
  };
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
            error={errors?.email}
            onChange={hanldeInput}
            name={"email"}
            value={data.email}
            rows={1}
            label="Email"
          />
          <CustomTextField
            error={errors?.password}
            onChange={hanldeInput}
            name={"password"}
            value={data.password}
            rows={1}
            label="Password"
          />

          <Button
            sx={{
              p: "15px 20px",
              borderRadius: "10px",
              background: "#010115",
              fontSize: "18px",
              fontWeight: "500",
              "&:hover": {
                background: "#1e1e20",
              },
            }}
            variant="contained"
            onKeyDown={(e) => console.log(e)}
            onClick={hanldeLogin}
          >
            Login
          </Button>
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
