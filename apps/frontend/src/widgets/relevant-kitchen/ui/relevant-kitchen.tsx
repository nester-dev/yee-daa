import type { FC } from "react";

import { useFilteredRecipes } from "@/features/select-filters";

import { CATEGORIES_DATA, type Category } from "@/entities/category";
import { RecipeCard, RecipeRow, useRecipeClick } from "@/entities/recipe";

import { UiTypography } from "@/shared/ui/ui-typography";

import styles from "./relevant-kitchen.module.scss";

type Props = {
  parentCategory?: Category;
};

const RelevantKitchen: FC<Props> = ({ parentCategory }) => {
  const subcategoriesIds = parentCategory?.subCategories.map(
    (item) => item._id,
  );

  const { data: response } = useFilteredRecipes({
    subcategoriesIds: subcategoriesIds?.join(","),
    limit: 5,
  });
  const [firstCard, secondCard, ...rest] = response?.data || [];
  const handleRecipeClick = useRecipeClick();

  if (!parentCategory) {
    return;
  }

  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <UiTypography
          className={styles.title}
          variant="title"
          fontWeight="medium"
        >
          {parentCategory.title}
        </UiTypography>
        <UiTypography className={styles.description} color="blackOverlay">
          {parentCategory.description}
        </UiTypography>
      </div>
      <div className={styles.grid}>
        <RecipeCard
          {...firstCard}
          showImage={false}
          className={styles.card}
          onClick={() => handleRecipeClick(firstCard, CATEGORIES_DATA)}
        />
        <RecipeCard
          {...secondCard}
          showImage={false}
          className={styles.card}
          onClick={() => handleRecipeClick(secondCard, CATEGORIES_DATA)}
        />

        <div className={styles.rows}>
          {rest?.map((recipe) => (
            <RecipeRow
              title={recipe?.title}
              categoryIcon={parentCategory.icon}
              onClick={() => handleRecipeClick(recipe, CATEGORIES_DATA)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelevantKitchen;
