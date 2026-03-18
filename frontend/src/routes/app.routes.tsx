import { useRoutes } from "react-router-dom";
import { lazy, Suspense } from "react";
import userRoutes from "./user.routes";
import { Loader } from "lucide-react";

// Routes
// import userRoutes from "./UserRoutes";
const Landing = lazy(()=>import("../pages/landing.page"));
const Auth = lazy(()=>import("../pages/login.page"))
// import LandingPage from "./pages/LandingPage";

function AppRoutes() {
  const routes = [
    { path: "/", element: <Landing /> },
    { path: "/login", element: <Auth /> },
    ...userRoutes
  ];
  return <Suspense fallback={<div><Loader /></div>}>{useRoutes(routes)}</Suspense>;
}

export default AppRoutes;