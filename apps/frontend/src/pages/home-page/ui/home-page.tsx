import { JuiciestSection } from "@/widgets/juiciest-section";
import { NewRecipesSection } from "@/widgets/new-recipes-section";
import {
  RelevantKitchen,
  useGetRelevantCategory,
} from "@/widgets/relevant-kitchen";

import { useGetAllCategoriesQuery } from "@/entities/category";

import styles from "./home-page.module.scss";

const HomePage = () => {
  useGetAllCategoriesQuery();
  const category = useGetRelevantCategory();

  return (
    <div className={styles.container}>
      <NewRecipesSection />
      <JuiciestSection />
      <RelevantKitchen parentCategory={category} />
    </div>
  );
};

export default HomePage;
