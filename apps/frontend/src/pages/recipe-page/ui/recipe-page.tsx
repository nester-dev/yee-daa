import type { FC } from "react";
import { useParams } from "react-router";

import { useGetRecipeByIdQuery } from "@/entities/recipe";

import UiContentContainer from "@/shared/ui/ui-content-container/ui-content-container.tsx";

import RecipeInfo from "./recipe-info/recipe-info.tsx";

const RecipePage: FC = () => {
  const { recipeId } = useParams();

  const { data } = useGetRecipeByIdQuery(recipeId!, { skip: !recipeId });

  return (
    <UiContentContainer>
      <RecipeInfo {...data} />
    </UiContentContainer>
  );
};

export default RecipePage;
