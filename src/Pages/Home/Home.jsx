import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import backgrund from "./../../assets/images/robot.svg";
import Logout from "../../Components/Logout/Logout";
const CustomTextField = ({ label="", rows=4, onChange=()=>{},name="", value="", error="" }) => {
  return (
    <Box sx={{
      mb:"20px",
    }}>
    <FormControl variant="standard" fullWidth>
      <TextField
        sx={{
          "&:hover": {
            border: "#1e1e20"
          },
          "&:active": {
            border: "#1e1e20"
          }
        }}
        name={name}
        label={label}
        onChange={onChange}
        value={value}
        color="secondary"
        InputLabelProps={{
          shrink: true, // This will keep the label on top
        }}
        multiline
        rows={rows} // Keep the number of rows the same for all text areas
      />
    </FormControl>
   {error? <Typography sx={{
      background:"whitesmoke",
      p:"10px",
      color:"red",
      mt:"8px",
      wordBreak:"break-all"
    }}>{error}</Typography>:null}
    </Box>
  );
};

const Home = () => {
  const [data, setData] = useState({
    title:"",
    bulletPoints:"",
    description:""
  })
  const [errors, setErrors] = useState({
    title:"",
    bulletPoints:"",
    description:""
  })
  const hanldeInput = (e)=>{
    setData(prev=> ({...prev,[e?.target?.name]:e?.target?.value}))
  }
  const handleErrors = (errors={})=>{
    console.log(errors)
    const errorData = []
    for(let key in errors){
      if(errors[key]){
        errorData.push({key:errors[key]})
        setErrors(prev=> ({...prev,[key]:errors[key]}))
      }
    }
  }

 useEffect(()=>{
handleErrors(data)
console.log(errors)
  },[data])
  return (
    <Box sx={{
      boxSizing: "border-box",
      m: {
        md: "auto"
      },
      width:{
        xs:"90vw",
        sm:"60vw",
        md:"80vw"
      },
      height: {
        xs: "auto",
        md: "auto",
      },
      p: {
        sm: "80px 30px 30px 30px",
        md: "60px",
        xs: "80px 20px 20px 20px"
      },
      maxWidth: "1200px",
      margin: "0 auto",
      background: "white",
      borderRadius: {
        sm:"30px",
        md:"50px",
        xs: "20px",
      },
      gap: "50px",
      display: "flex",
      flexDirection: {
        md: "row",
        xs: "column"
      },
      position:"relative"
    }}>
        <Box sx={{position:"absolute", top:"30px", right:"30px"}}>
          <Logout/>
        </Box>
      <Box sx={{
        flexBasis: {
          md: "50%",
          xs: "100%"

        },
        flexGrow:"0",
        flexShrink: "1",
      
      }}>
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: {
            md:"20px",
            xs:"5px"
          }
        }}>
          <CustomTextField mb="20px" error={errors?.title} onChange={hanldeInput} name={"title"} value={data.title} rows={1} label="Add Title" />
          <CustomTextField mb="20px" error={errors?.bulletPoints}  onChange={hanldeInput}  name={"bulletPoints"} value={data?.bulletPoints}  label="Add Bullet Points" />
          <CustomTextField mb="20px" error={errors?.description}  onChange={hanldeInput}  name={"description"} value={data?.description}  rows={8} label="Add Description" />
          <Button sx={{
            p: "15px 20px",
            borderRadius: "10px",
            background: "#010115",
            fontSize: "18px",
            fontWeight: "500",
            "&:hover": {
              background: "#1e1e20"
            }
          }} variant="contained">Analyze </Button>
        </Box>
      </Box>
      <Box sx={{
        flexBasis: {
          xs: "50%",
        },
        flexShrink: "1",
        display: {
          xs:"none",
          md:"flex"
        },
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "30px"
      }}>
      
        <Box sx={{
          background: `url(${backgrund})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "300px",
          height: "200px"
        }}>
        </Box>
        <Typography sx={{
          fontFamily: "clashdisplay",
          color: "#010115",
          lineHeight: "30.75px",
          fontSize: "25px",
          fontWeight: "600",
          textAlign: "center"
        }}>
          AI CHAT BOT
        </Typography>
        <Typography sx={{
          fontFamily: "Segoe",
          color: "#808285",
          textAlign: "center",
          lineHeight: "30.75px",
          fontSize: "20px",
          fontWeight: "400",
        }}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia quam atque, iusto saepe ad nobis dolore.
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;
