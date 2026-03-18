import api from "./api";

export const AUTH_API = {
    LOGIN:(payload:{email: string,password: string}) => api.post("/auth/login",payload).then((res)=>res.data),
    GET_USER:() => api.get("/auth/me").then((res)=>res.data),
}