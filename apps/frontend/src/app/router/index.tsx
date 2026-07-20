import { createBrowserRouter, RouterProvider } from "react-router";

import { BloggerPage } from "@/pages/blogger-page";
import { CategoryPage } from "@/pages/category-page";
import { EditDraftRecipe } from "@/pages/edit-draft-recipe";
import { EditRecipePage } from "@/pages/edit-recipe-page";
import { FoodBlogsPage } from "@/pages/food-blogs-page";
import { HomePage } from "@/pages/home-page";
import { NewRecipe } from "@/pages/new-recipe";
import { ProfilePage } from "@/pages/profile-page";
import { RecipePage } from "@/pages/recipe-page";
import { SignIn } from "@/pages/sign-in";
import { SignUp } from "@/pages/sign-up";
import { VerificationPage } from "@/pages/verification-page";

import { ProtectedRoute } from "@/entities/auth";

import { ROUTE_PATHS } from "@/shared/config/route-paths.ts";

import AuthLayout from "../layouts/auth-layout/auth-layout.tsx";
import DefaultLayout from "../layouts/default-layout/default-layout.tsx";

const router = createBrowserRouter([
  {
    Component: DefaultLayout,
    children: [
      {
        Component: ProtectedRoute,
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
            path: ":category/:subcategory/:recipeId",
            Component: RecipePage,
          },
          {
            path: ROUTE_PATHS.NEW_RECIPE,
            Component: NewRecipe,
          },
          {
            path: ROUTE_PATHS.FOOD_BLOGS,
            Component: FoodBlogsPage,
          },
          {
            path: `${ROUTE_PATHS.BLOGS}/:bloggerId`,
            Component: BloggerPage,
          },
          {
            path: ROUTE_PATHS.PROFILE,
            Component: ProfilePage,
          },
          {
            path: `${ROUTE_PATHS.EDIT_DRAFT_RECIPE}/:recipeId`,
            Component: EditDraftRecipe,
          },
          {
            path: `${ROUTE_PATHS.EDIT_RECIPE}/:category/:subcategory/:recipeId`,
            Component: EditRecipePage,
          },
        ],
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
