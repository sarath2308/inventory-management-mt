import { type RouteObject } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Loader } from "lucide-react";
import AppLayout from "@/components/app.layout";
import ProtectedRoute from "./protected/route.protector";

// Lazy Loads
const ItemsPage = lazy(() => import("@/pages/items.page"));
const CustomerPage = lazy(()=> import("@/pages/customers.page"));
const SalesPage = lazy(()=> import("@/pages/sales.page"));


const userRoutes: RouteObject[] = [
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />, // All children here will have Sidebar + Topbar
        children: [
          { 
            path: "/items", 
            element: (
              <Suspense fallback={<Loader />}>
                <ItemsPage />
              </Suspense>
            ) 
          },
          { 
            path: "/sales", 
            element: (
              <Suspense fallback={<Loader />}>
                <SalesPage />
              </Suspense>
            ) 
          },
           { 
            path: "/customers", 
            element: (
              <Suspense fallback={<Loader />}>
                <CustomerPage />
              </Suspense>
            ) 
          },
        ],
      },
    ],
  },
];

export default userRoutes;