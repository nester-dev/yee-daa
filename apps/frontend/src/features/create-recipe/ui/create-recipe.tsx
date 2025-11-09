import type { FC } from "react";
import { Link } from "react-router";

import CreateRecipeIcon from "@/shared/assets/icons/create-recipe-icon.svg?react";
import { ROUTE_PATHS } from "@/shared/config/route-paths.ts";
import { UiTypography } from "@/shared/ui/ui-typography";

import styles from "./create-recipe.module.scss";

const CreateRecipe: FC = () => {
  return (
    <Link to={ROUTE_PATHS.NEW_RECIPE} className={styles["create-recipe"]}>
      <CreateRecipeIcon />
      <UiTypography>Записать рецепт</UiTypography>
    </Link>
  );
};

export default CreateRecipe;
