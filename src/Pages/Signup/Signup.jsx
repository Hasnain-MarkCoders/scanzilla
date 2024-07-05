
import { Box, Button, FormControl, TextField, Typography, Checkbox } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

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
const Signup = () => {
    const [data, setData] = useState({
        fullName: "",
        email: "",
        password: "",
    });

    const [isLoading, setIsLoading] = useState(false)
    const auth = useSelector((state) => state.auth);
    const inputRef = useRef(null)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [errors, setErrors] = useState({
        fullName: "",
        email: "",
        password: "",
    });
    const handleInput = (e) => {
        setData((prev) => ({ ...prev, [e?.target?.name]: e?.target?.value }));
    };

    const handleSignup = async () => {
        setIsLoading(true)

        setErrors({ fullName: "", email: "", password: "", })
        if (data?.fullName === "" && data?.password === "", data?.email === "") {
            setIsLoading(false)
            return setErrors({ fullName: "Full name can not be empty", password: "Password can not be empty", email: "Email can not be empty" })

        }
        if (data?.email === "") {
            setIsLoading(false)
            return setErrors({ fullName: "", password: "", email: "Email can not be empty" })
        }
        if (data?.fullName === "") {
            setIsLoading(false)
            return setErrors({ fullName: "Password can not be empty", email: "", password: "" })
        }
        if (data?.password === "") {
            setIsLoading(false)
            return setErrors({ password: "Password can not be empty", email: "", fullName: "" })
        }

        console.log("full name", data.fullName)
        console.log("email", data.email)
        console.log("Password", data.password)
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
                fullName: "",
                email: "",
                password: "",
            });

            // navigate("/text-analyze");
            // sessionStorage.setItem("accessToken", response?.accessToken);
            // sessionStorage.setItem("refreshToken", response?.refreshToken);

        } catch (error) {
            // const errorData = error.response.data
            // if (error.response.data.errorType.includes("email")) {
            //     setErrors({ password: "", email: error.response.data.message })
            // }
            // if (error.response.data.errorType.includes("password")) {
            //     setErrors({ email: "", password: error.response.data.message })
            // }
            // setIsLoading(false)

            // return dispatch(
            //     handleSnackAlert({
            //         open: true,
            //         message: errorData?.message,
            // severity: "error",
            //     })
            // );

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
                        Sign up
                    </Typography>
                    <Typography
                        sx={{
                            color: "#A0A4A9",
                            fontSize: "1rem",
                            fontWeight: "400",
                        }}
                    >
                        Sign up now to unlock exclusive benefits!
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
                        >Full Name</label>
                        <CustomTextField
                            ref={inputRef}
                            handlekeydown={handlekeydown}
                            error={errors?.fullName}
                            onChange={handleInput}
                            name={"fullName"}
                            value={data.fullName}
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
                        >Email</label>
                        <CustomTextField
                            handlekeydown={handlekeydown}
                            error={errors?.email}
                            onChange={handleInput}
                            name={"email"}
                            type="email"
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
                        >Set Password</label>
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
                        display: "flex  ",
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

                </Box>
                <Box sx={{
                    position: "relative",
                    marginTop: "40px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.56rem",
                    // border:"2px solid red"
                }}>
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
                            boxShadow: "none"
                        }}
                        variant="contained"
                        onClick={handleSignup}
                    >
                        {isLoading ? <LoaderW /> : "Sign up"}
                    </Button>

                    <Button
                        sx={{
                            p: "15px 20px",
                            background: "white",
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
                                background: "linear-gradient(to right, #1A0049, #41016C)",
                                color: "white"
                            },
                            boxShadow: "none",
                            border: "1px solid grey",
                            color: "black"
                        }}
                        variant="contained"
                        onClick={handleSignup}
                    >
                        <span style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                            <img src={GoogleIcon} alt="Google Icon" style={{ height: "40px" }} />
                            <span>Sign up With Google</span>
                        </span>
                    </Button>
                </Box>
                <Box

                    sx={{
                        display: "flex",
                        // border:"2px solid red",
                        alignItems: "center",
                        gap: "4px",
                        justifyContent: "center",
                        marginTop: "40px"
                    }}>
                    <Typography
                        sx={{
                            fontSize: {
                                xs: "12px",
                                sm: "18px"
                            },
                            color: "#A0A4A9",
                        }}
                    >Don’t have an account? </Typography>
                    <Typography
                        sx={{
                            color: "#1E004D",
                            textDecoration: "underline"
                        }}
                    ><NavLink to='/'
                        style={{
                            color: "#1E004D",
                            fontWeight: "600",

                        }}
                    >Sign in</NavLink></Typography>
                </Box>

            </Box>
        </Box>
    )
}

export default Signup