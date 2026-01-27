import { NewRecipesSection } from "@/widgets/new-recipes-section";

import { useGetAllCategoriesQuery } from "@/entities/category/api/category-api.ts";

const HomePage = () => {
  useGetAllCategoriesQuery();

  return (
    // <section
    //   style={{
    //     display: "grid",
    //     gridTemplateColumns: "repeat(2, 1fr)",
    //     gridAutoRows: "244px",
    //     gap: "24px",
    //   }}
    // >
    //   123
    // </section>
    <NewRecipesSection />
  );
};

export default HomePage;
