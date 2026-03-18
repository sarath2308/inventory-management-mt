import { useMutation } from "@tanstack/react-query"
import { AUTH_API } from "../../api/auth.api"
import toast from "react-hot-toast"
import { AxiosError } from "axios"
import { useNavigate } from "react-router-dom"

export const useLogin = () =>
{
    const navigate = useNavigate();
    return useMutation({
        mutationFn: AUTH_API.LOGIN,
        onSuccess:(res)=>
        {
            toast.success(res.message ?? "User Authenticated");
            navigate("/items");
        },
        onError:(err : unknown) =>{
            if(err instanceof AxiosError)
            {
                toast.error(err.response?.data.message || "Login failed, try after sometimes")
            }
            else
            {
                toast.error("Something went wrong, try after sometimes")
            }
        }
    })
}