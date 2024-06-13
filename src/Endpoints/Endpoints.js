import { POST } from "./Request";

export const LoginUser = (data)=>POST("/login", data)
export const authStatus = ()=>Get("/login")