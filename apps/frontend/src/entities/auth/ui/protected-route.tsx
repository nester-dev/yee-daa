import type { FC } from "react";
import { Navigate, Outlet, useLocation } from "react-router";

import { ROUTE_PATHS } from "@/shared/config/route-paths.ts";
import { getAccessToken } from "@/shared/lib/cookies.ts";

const ProtectedRoute: FC = () => {
  const location = useLocation();
  const isAuthenticated = Boolean(getAccessToken());

  if (!isAuthenticated) {
    return (
      <Navigate to={ROUTE_PATHS.SIGN_IN} replace state={{ from: location }} />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
