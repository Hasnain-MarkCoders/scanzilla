import axiosInstance from "../Hooks/useQueryGallery/AuthHook/AuthHook";
import { POST } from "./Request";
const appUrl= import.meta.env.VITE_REACT_APP_API_URL
export const LoginUser = async(data)=>{
    try{
        const response = await axiosInstance({url:appUrl+"/login", method:"post", data:data})
        return response.data
    }
    catch(error){
      throw new Error(error) ;
    }
}