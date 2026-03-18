import { useGetUser } from "@/hooks/auth/auth.me.hook";
import { Loader } from "lucide-react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
    const { data: response, isLoading, isError } = useGetUser();

    if (isLoading) {
        return <Loader />;
    }

    if (isError || !response?.success) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}
