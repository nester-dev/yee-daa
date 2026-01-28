import { JuiciestSection } from "@/widgets/juiciest-section";
import { NewRecipesSection } from "@/widgets/new-recipes-section";

import { useGetAllCategoriesQuery } from "@/entities/category/api/category-api.ts";

import styles from "./home-page.module.scss";

const HomePage = () => {
  useGetAllCategoriesQuery();

  return (
    <div className={styles.container}>
      <NewRecipesSection />
      <JuiciestSection />
    </div>
  );
};

export default HomePage;
