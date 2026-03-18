import { AUTH_API } from "@/api/auth.api";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = () => {
    return useQuery({
        queryKey: ["get-user"],
        queryFn: AUTH_API.GET_USER,
    });
};
