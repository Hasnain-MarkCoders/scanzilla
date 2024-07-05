import React from 'react'
import { Box, Button, FormControl, TextField, Typography, Checkbox } from "@mui/material";
import { NavLink } from 'react-router-dom';

const OTP = () => {

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
                    OTP
                </Typography>
                <Typography
                    sx={{
                        color: "#A0A4A9",
                        fontSize: "1rem",
                        fontWeight: "400",
                    }}
                >
                    Please send OTP sent tou your Email.
                </Typography>
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    flexGrow: "1",
                    justifyContent: {
                        md: "space-between"
                    },
                    gap: {
                        lg: "1rem",
                        md: "0.3rem",
                        xs: "0.6rem"
                    },
                    marginTop: "70px"
                }}
            >

                <TextField

                    variant="outlined"
                    size="medium"
                    sx={{
                        fontSize: "3rem",
                        "& .MuiInputBase-input": {
                            textAlign: "center",
                            borderRadius: "12px",
                            height: {
                                lg: "56px",
                                md: "30px",

                            },
                            width: {
                                lg: "50.46px",
                                md: "25px"

                            },
                        },
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                        },
                    }}
                />
                <TextField

                    variant="outlined"
                    size="medium"
                    sx={{
                        "& .MuiInputBase-input": {
                            textAlign: "center",
                            borderRadius: "12px",
                            height: {
                                lg: "56px",
                                md: "30px",

                            },
                            width: {
                                lg: "50.46px",
                                md: "25px"

                            },
                        },
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                        },
                    }}
                />
                <TextField

                    variant="outlined"
                    size="medium"
                    sx={{
                        "& .MuiInputBase-input": {
                            textAlign: "center",
                            borderRadius: "12px",
                            height: {
                                lg: "56px",
                                md: "30px",

                            },
                            width: {
                                lg: "50.46px",
                                md: "25px"

                            },
                        },
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                        },
                    }}
                />
                <TextField

                    variant="outlined"
                    size="medium"
                    sx={{
                        "& .MuiInputBase-input": {
                            textAlign: "center",
                            borderRadius: "12px",
                            height: {
                                lg: "56px",
                                md: "30px",

                            },
                            width: {
                                lg: "50.46px",
                                md: "25px"

                            },
                        },
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                        },
                    }}
                />
                <TextField

                    variant="outlined"
                    size="medium"
                    sx={{
                        "& .MuiInputBase-input": {
                            textAlign: "center",
                            borderRadius: "12px",
                            height: {
                                lg: "56px",
                                md: "30px",

                            },
                            width: {
                                lg: "50.46px",
                                md: "25px"

                            },
                        },
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                        },
                    }}
                />
                <TextField
                    variant="outlined"
                    size="medium"
                    sx={{
                        "& .MuiInputBase-input": {
                            textAlign: "center",
                            borderRadius: "12px",
                            height: {
                                lg: "56px",
                                md: "30px",

                            },
                            width: {
                                lg: "50.46px",
                                md: "25px"

                            },
                        },
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                        },
                    }}
                />
            </Box>
            <Box sx={{
                position: "relative",
                marginTop: "80px",
            }}>
                <Button
                    sx={{
                        marginTop: "90px",
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
                // onClick={handleLogin}
                >
                    {/* {isLoading ? <LoaderW /> : "Submit OTP"} */}
                    Submit OTP
                </Button>

            </Box>

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    justifyContent: "center",
                    marginTop: "120px"
                }}>
                <Typography
                    sx={{
                        fontSize: {
                            xs: "12px",
                            sm: "18px"
                        },
                        color: "#A0A4A9",
                    }}
                >Didn’t receive an OTP?</Typography>
                <Typography
                    sx={{
                        color: "#1E004D",
                        textDecoration: "underline"
                    }}
                >Resend OTP</Typography>
            </Box>

        </Box>
    )
}

export default OTP