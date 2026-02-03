import type { FC } from "react";

import type { RecipeType } from "@/entities/recipe";

import Ingredients from "./ingredients.tsx";
import Nutrition from "./nutrition.tsx";

type Props = Partial<Pick<RecipeType, "nutritionValue" | "ingredients">>;

const IngredientsAndNutrition: FC<Props> = ({
  nutritionValue,
  ingredients,
}) => {
  return (
    <div>
      <Nutrition nutritionValue={nutritionValue} />
      <Ingredients ingredients={ingredients} />
    </div>
  );
};

export default IngredientsAndNutrition;
