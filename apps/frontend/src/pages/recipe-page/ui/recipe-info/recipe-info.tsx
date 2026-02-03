import type { FC } from "react";

import { CATEGORIES_DATA } from "@/entities/category";
import { getRecipeCategories, type RecipeType } from "@/entities/recipe";
import { UserStats } from "@/entities/user-stats";

import ClockIcon from "@/shared/assets/icons/alarm-icon.svg?react";
import UiTag from "@/shared/ui/ui-tag/ui-tag.tsx";
import { UiTypography } from "@/shared/ui/ui-typography";

import RecipeInfoActions from "./recipe-info-actions.tsx";

import styles from "./recipe-info.module.scss";

const RecipeInfo: FC<Partial<RecipeType>> = ({
  image,
  likes,
  bookmarks,
  title,
  description,
  time,
  categoriesIds,
}) => {
  const imagePath = `${import.meta.env.VITE_ASSETS_URL}/${image}`;
  const categories = getRecipeCategories(CATEGORIES_DATA, categoriesIds);

  console.log(categories);

  return (
    <div className={styles.container}>
      <img className={styles.image} src={imagePath} alt="recipe-image" />
      <div className={styles.info}>
        <div className={styles["info__top"]}>
          <div className={styles["info__categories"]}>
            {categories.map((root) => (
              <UiTag
                color="cream"
                className={styles["info__category"]}
                icon={
                  <img
                    src={`${import.meta.env.VITE_ASSETS_URL}/${root.icon}`}
                    alt={root.title}
                  />
                }
              >
                {root.title}
              </UiTag>
            ))}
          </div>

          <UserStats
            likesCount={likes}
            bookmarksCount={bookmarks}
            size="small"
          />
        </div>

        <div className={styles["info__text"]}>
          <UiTypography variant="title" tag="h1" fontWeight="bold">
            {title}
          </UiTypography>
          <UiTypography>{description}</UiTypography>
        </div>

        <div className={styles["info__bottom"]}>
          <UiTag
            icon={<ClockIcon />}
            color="blackSoft"
          >{`${time} минут`}</UiTag>
          <RecipeInfoActions />
        </div>
      </div>
    </div>
  );
};

export default RecipeInfo;
