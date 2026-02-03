import { FiltersDrawer, useFilterDrawer } from "@/widgets/filters-drawer";
import { JuiciestSection } from "@/widgets/juiciest-section";
import { NewRecipesSection } from "@/widgets/new-recipes-section";
import { RecipeSearchPanel } from "@/widgets/recipe-search-panel";
import {
  RelevantKitchen,
  useGetRelevantCategory,
} from "@/widgets/relevant-kitchen";

import { useGetAllCategoriesQuery } from "@/entities/category";

import UiContentContainer from "@/shared/ui/ui-content-container/ui-content-container.tsx";

const HomePage = () => {
  useGetAllCategoriesQuery();
  const category = useGetRelevantCategory();
  const { isOpen, toggleFiltersDrawer } = useFilterDrawer();

  return (
    <UiContentContainer>
      <RecipeSearchPanel
        heading="Приятного аппетита!"
        description="Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда."
        onFilersClick={toggleFiltersDrawer}
      />
      <NewRecipesSection />
      <JuiciestSection />
      <RelevantKitchen parentCategory={category} />
      <FiltersDrawer isOpen={isOpen} onClose={toggleFiltersDrawer} />
    </UiContentContainer>
  );
};

export default HomePage;
