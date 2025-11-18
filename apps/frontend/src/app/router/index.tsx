import { createBrowserRouter, RouterProvider } from "react-router";

import AuthLayout from "@/app/layouts/auth-layout/auth-layout.tsx";
import DefaultLayout from "@/app/layouts/default-layout/default-layout.tsx";

import { CategoryPage } from "@/pages/category-page";
import { HomePage } from "@/pages/home-page";
import { NewRecipe } from "@/pages/new-recipe";
import { SignIn } from "@/pages/sign-in";
import { SignUp } from "@/pages/sign-up";

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
      {
        path: ROUTE_PATHS.NEW_RECIPE,
        Component: NewRecipe,
      },
    ],
  },
  {
    path: ROUTE_PATHS.AUTH,
    Component: AuthLayout,
    children: [
      {
        path: ROUTE_PATHS.SIGN_UP,
        Component: SignUp,
      },
      {
        path: ROUTE_PATHS.SIGN_IN,
        Component: SignIn,
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
