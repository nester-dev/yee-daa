import { useGetAllCategoriesQuery } from "@/entities/category/api/category-api.ts";
import { RecipeCard } from "@/entities/recipe";
import { useGetAllRecipesQuery } from "@/entities/recipe/api/recipe-api.ts";

const HomePage = () => {
  const { data: response } = useGetAllRecipesQuery({
    sortBy: "likes",
  });
  useGetAllCategoriesQuery();

  return (
    <section
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gridAutoRows: "244px",
        gap: "24px",
      }}
    >
      {response?.data?.map((recipe) => (
        <RecipeCard key={recipe._id} {...recipe} direction="row" />
      ))}
    </section>
  );
};

export default HomePage;
