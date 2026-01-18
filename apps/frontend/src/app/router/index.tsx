import { createBrowserRouter, RouterProvider } from "react-router";

import { CategoryPage } from "@/pages/category-page";
import { HomePage } from "@/pages/home-page";
import { NewRecipe } from "@/pages/new-recipe";
import { SignIn } from "@/pages/sign-in";
import { SignUp } from "@/pages/sign-up";
import { VerificationPage } from "@/pages/verification-page";

import { ROUTE_PATHS } from "@/shared/config/route-paths.ts";

import AuthLayout from "../layouts/auth-layout/auth-layout.tsx";
import DefaultLayout from "../layouts/default-layout/default-layout.tsx";

const router = createBrowserRouter([
  {
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
    Component: AuthLayout,
    children: [
      {
        path: ROUTE_PATHS.SIGN_UP,
        Component: SignUp,
      },
      {
        path: ROUTE_PATHS.VERIFICATION,
        Component: VerificationPage,
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
