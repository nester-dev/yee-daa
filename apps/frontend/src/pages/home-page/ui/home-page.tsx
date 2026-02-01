import { FiltersDrawer, useFilterDrawer } from "@/widgets/filters-drawer";
import { JuiciestSection } from "@/widgets/juiciest-section";
import { NewRecipesSection } from "@/widgets/new-recipes-section";
import { RecipeSearchPanel } from "@/widgets/recipe-search-panel";
import {
  RelevantKitchen,
  useGetRelevantCategory,
} from "@/widgets/relevant-kitchen";

import { useGetAllCategoriesQuery } from "@/entities/category";

import styles from "./home-page.module.scss";

const HomePage = () => {
  useGetAllCategoriesQuery();
  const category = useGetRelevantCategory();
  const { isOpen, toggleFiltersDrawer } = useFilterDrawer();

  return (
    <div className={styles.container}>
      <RecipeSearchPanel
        heading="Приятного аппетита!"
        description="Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда."
        onFilersClick={toggleFiltersDrawer}
      />
      <NewRecipesSection />
      <JuiciestSection />
      <RelevantKitchen parentCategory={category} />
      <FiltersDrawer isOpen={isOpen} onClose={toggleFiltersDrawer} />
    </div>
  );
};

export default HomePage;
