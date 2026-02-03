import type { FC } from "react";

import { useFilteredRecipes } from "@/features/select-filters";

import { CATEGORIES_DATA } from "@/entities/category";
import { RecipeCard, useRecipeClick } from "@/entities/recipe";

import ArrowIcon from "@/shared/assets/icons/arrow-left.svg?react";
import { useIsAboveLaptopDevice } from "@/shared/lib/use-media-query.ts";
import UiButton from "@/shared/ui/ui-button/ui-button.tsx";
import { UiTypography } from "@/shared/ui/ui-typography";

import ActionButtons from "./action-buttons.tsx";

import styles from "./juciest.module.scss";

const JuiciestSection: FC = () => {
  const isAboveLaptopDevice = useIsAboveLaptopDevice();
  const { data: response } = useFilteredRecipes({
    sortBy: "likes",
    page: 42,
    limit: 4,
    transformResponse: true,
  });
  const handleRecipeClick = useRecipeClick();

  return (
    <section className={styles.section}>
      <UiTypography
        variant="xl-5"
        fontWeight="medium"
        className={styles.heading}
      >
        Самое сочное
      </UiTypography>
      <UiButton
        color="success"
        icon={<ArrowIcon />}
        className={styles.button}
        iconPosition="end"
      >
        <UiTypography variant="lg" fontWeight="semibold">
          Вся подборка
        </UiTypography>
      </UiButton>
      <div className={styles.grid}>
        {response?.data?.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            {...recipe}
            direction="row"
            actions={<ActionButtons />}
            hideDescription={isAboveLaptopDevice}
            onClick={() => handleRecipeClick(recipe, CATEGORIES_DATA)}
          />
        ))}
      </div>
    </section>
  );
};

export default JuiciestSection;
