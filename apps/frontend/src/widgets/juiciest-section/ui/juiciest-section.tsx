import type { FC } from "react";

import { useFilteredRecipes } from "@/features/select-filters";

import { RecipeCard } from "@/entities/recipe";

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
    limit: 4,
  });

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
          />
        ))}
      </div>
    </section>
  );
};

export default JuiciestSection;
