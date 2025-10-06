import { createBrowserRouter } from "react-router";
import { ROUTE_PATHS } from "@/shared/config/route-paths.ts";
import { HomePage } from "@/pages/home-page";


export const router = createBrowserRouter([
  {
    path: ROUTE_PATHS.HOME,
    Component: HomePage
  },
]);