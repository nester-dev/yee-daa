import { createBrowserRouter, RouterProvider } from "react-router";

import DefaultLayout from "@/app/layouts/default-layout/default-layout.tsx";

import { CategoryPage } from "@/pages/category-page";
import { HomePage } from "@/pages/home-page";

import { ROUTE_PATHS } from "@/shared/config/route-paths.ts";

const router = createBrowserRouter([
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

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
