import { Navigate } from "react-router-dom";
import AboutView from "@/views/About";
import AuthView from "@/views/Auth";
import { PublicLayout } from "@/layout";
import { IS_DEBUG } from "@/config";
import DevView from "@/views/Dev";

const PUBLIC_ROUTES = [
  {
    element: <PublicLayout />, // Layout as parent/wrapper component for all routes
    children: [
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
      {
        path: "/",
        element: <AuthView />,
      },
      {
        path: "/about",
        element: <AboutView />,
      },
      {
        path: "/auth",
        element: <AuthView />,
      },
    ],
  },
];

// Add debug routes
IS_DEBUG &&
  PUBLIC_ROUTES[0].children.push({
    path: "/dev",
    element: <DevView />,
  });

export default PUBLIC_ROUTES;
