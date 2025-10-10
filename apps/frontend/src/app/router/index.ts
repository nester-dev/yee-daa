import { createBrowserRouter } from "react-router";
import { ROUTE_PATHS } from "@/shared/config/route-paths.ts";
import DefaultLayout from "@/app/layouts/default-layout.tsx";
import { HomePage } from "@/pages/home-page";
import { CategoryPage } from "@/pages/category-page";

export const router = createBrowserRouter([
  {
    path: ROUTE_PATHS.HOME,
    Component: DefaultLayout,
    children: [
      {
        path: ROUTE_PATHS.HOME,
        Component: HomePage,
      },
      {
        path: ":category/:subcategory",
        Component: CategoryPage,
      },
    ],
  },
]);
