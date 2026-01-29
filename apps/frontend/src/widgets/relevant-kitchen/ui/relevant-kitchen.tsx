import type { FC } from "react";

import type { Category } from "@/entities/category";
import {
  RecipeCard,
  RecipeRow,
  useGetAllRecipesQuery,
} from "@/entities/recipe";

import { UiTypography } from "@/shared/ui/ui-typography";

import styles from "./relevant-kitchen.module.scss";

type Props = {
  parentCategory?: Category;
};

const RelevantKitchen: FC<Props> = ({ parentCategory }) => {
  const subcategoriesIds = parentCategory?.subCategories.map(
    (item) => item._id,
  );

  const { data: response } = useGetAllRecipesQuery({
    subcategoriesIds: subcategoriesIds?.join(","),
    limit: 5,
  });
  const [firstCard, secondCard, ...rest] = response?.data || [];

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
        <RecipeCard {...firstCard} showImage={false} className={styles.card} />
        <RecipeCard {...secondCard} showImage={false} className={styles.card} />

        <div className={styles.rows}>
          {rest?.map((recipe) => (
            <RecipeRow
              title={recipe?.title}
              categoryIcon={parentCategory.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelevantKitchen;
