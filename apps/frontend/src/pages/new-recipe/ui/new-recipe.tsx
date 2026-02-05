import type { FC } from "react";

import UiContentContainer from "@/shared/ui/ui-content-container/ui-content-container.tsx";

import RecipeHeaderSection from "./recipe-header-section/recipe-header-section.tsx";

const NewRecipe: FC = () => {
  return (
    <UiContentContainer>
      <RecipeHeaderSection />
    </UiContentContainer>
  );
};

export default NewRecipe;
