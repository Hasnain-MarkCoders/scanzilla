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



const appUrl = import.meta.env.VITE_REACT_APP_API_URL
const SetPassword = () => {
    const [data, setData] = useState({
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({
        password: "",
        confirmPassword: "",
    });

    const [isLoading, setIsLoading] = useState(false)
    const auth = useSelector((state) => state.auth);
    const inputRef = useRef(null)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleInput = (e) => {
        setData((prev) => ({ ...prev, [e?.target?.name]: e?.target?.value }));
    };

    const handleSetPassword = async () => {
        setIsLoading(true)

        setErrors({ password: "", email: "" })
        if (data?.password === "" && data?.confirmPassword === "") {
            setIsLoading(false)
            return setErrors({ password: "Password can not be empty", confirmPassword: "Confirm Password can not be empty" })

        }
        if (data?.password === "") {
            setIsLoading(false)
            return setErrors({ confirmPassword: "", password: "Password can not be empty" })
        }
        if (data?.confirmPassword === "") {
            setIsLoading(false)
            return setErrors({ confirmPassword: "Confirm Password can not be empty", password: "" })
        }
        console.log("password", data.password)
        console.log("confirmPassword", data.confirmPassword)


        try {
            //   let response = await axiosInstance({ url: appUrl + "/login", method: "post", data: data });
            //   response = response?.data
            //   const responseData = {
            //     user: response?.user,
            //     accessToken: response?.accessToken,
            //     refreshToken: response?.refreshToken,
            //     authenticated: true,
            //   };
            //   dispatch(handleAuth(responseData));
            //   dispatch(
            //     handleSnackAlert({
            //       open: true,
            //       message: response.message,
            //       severity: "success",
            //     })
            //   );
            setIsLoading(false)
            setData({
                password: "",
                confirmPassword: "",
            });
            //   navigate("/text-analyze");
            //   sessionStorage.setItem("accessToken", response?.accessToken);
            //   sessionStorage.setItem("refreshToken", response?.refreshToken);

        } catch (error) {
            //   const errorData = error.response.data
            //   if (error.response.data.errorType.includes("email")) {
            //     setErrors({ password: "", email: error.response.data.message })
            //   }
            //   if (error.response.data.errorType.includes("password")) {
            //     setErrors({ email: "", password: error.response.data.message })
            //   }
            //   setIsLoading(false)

            //   return dispatch(
            //     handleSnackAlert({
            //       open: true,
            //       message: errorData?.message,
            //       severity: "error",
            //     })
            //   );

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
                    Set Password
                </Typography>
                <Typography
                    sx={{
                        color: "#A0A4A9",
                        fontSize: "1rem",
                        fontWeight: "400",
                    }}
                >
                    Please enter your new password
                </Typography>
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "30px"
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
                    >Password</label>
                    <CustomTextField
                        ref={inputRef}
                        handlekeydown={handlekeydown}
                        error={errors?.password}
                        onChange={handleInput}
                        name={"password"}
                        value={data.password}
                        rows={1}
                        type="password"
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
                    >Confirm Password</label>
                    <CustomTextField
                        handlekeydown={handlekeydown}
                        error={errors?.confirmPassword}
                        onChange={handleInput}
                        name={"confirmPassword"}
                        type="password"
                        value={data.confirmPassword}
                        rows={1}
                    />
                </Typography>
            </Box>
            <Box>
                <Button
                    sx={{
                        p: "15px 20px",
                        background: "linear-gradient(to right, #1A0049, #41016C)",
                        width: "100%",
                        height: "56px",
                        borderRadius: "32px",
                        fontSize: {
                            xs: "14px",
                            sm: "18px"
                        },
                        fontWeight: "500",
                        textTransform: "none",
                        transition: "background 0.9s ease, color 0.4s ease",
                        "&:hover": {
                            background: "linear-gradient(to right, #1G1947, #41016C)",
                            color: "white"
                        },
                        boxShadow: "none",
                        marginTop:"80px"
                    }}
                    variant="contained"
                    onClick={handleSetPassword}
                >
                    {isLoading ? <LoaderW /> : "Confirm Password"}
                </Button>
            </Box>

        </Box>
    )
}

export default SetPassword