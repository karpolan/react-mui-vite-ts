import { useCallback, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { IS_DEBUG } from "@/config";
import { AppLoading } from "@/components";
import { useAuthWatchdog, useIsAuthenticated } from "@/hooks";
import PRIVATE_ROUTES from "./PrivateRoutes";
import PUBLIC_ROUTES from "./PublicRoutes";

const routesPrivate = createBrowserRouter(PRIVATE_ROUTES);
const routesPublic = createBrowserRouter(PUBLIC_ROUTES);

/**
 * Renders routes depending on Authenticated or Anonymous users
 * @component Routes
 */
const Routes = () => {
  const [loading, setLoading] = useState(true);
  const [refreshCount, setRefreshCount] = useState(0);
  const isAuthenticated = useIsAuthenticated();

  const afterLogin = useCallback(() => {
    setRefreshCount((old) => old + 1); // Force re-render
    setLoading(false);
  }, []);

  const afterLogout = useCallback(() => {
    setRefreshCount((old) => old + 1); // Force re-render
    setLoading(false);
  }, []);

  // Create Auth watchdog, that calls our callbacks wen user is logged in or logged out
  useAuthWatchdog(afterLogin, afterLogout);

  if (loading) {
    return <AppLoading />;
  }

  IS_DEBUG &&
    console.log("Render <Routes/>", { isAuthenticated, refresh: refreshCount });

  return (
    <RouterProvider router={isAuthenticated ? routesPrivate : routesPublic} />
  );
};
export default Routes;
