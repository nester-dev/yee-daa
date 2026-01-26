import { type FC, type ReactNode } from "react";
import { useSelector } from "react-redux";
import { Truncate } from "@re-dev/react-truncate";
import cn from "clsx";

import { selectCategoriesById } from "@/entities/category";
import type { RecipeType } from "@/entities/recipe/model/types.ts";
import { UserStats } from "@/entities/user-stats";

import UiTag from "@/shared/ui/ui-tag/ui-tag.tsx";
import { UiTypography } from "@/shared/ui/ui-typography";

import styles from "./recipe-card.module.scss";

type Props = RecipeType & {
  direction?: "column" | "row";
  actions?: ReactNode;
  onClick?: () => void;
};

const RecipeCard: FC<Props> = ({
  direction = "column",
  actions,
  onClick,
  title,
  description,
  image,
  likes,
  bookmarks,
  categoriesIds,
}) => {
  const cardImage = image
    ? `${import.meta.env.VITE_ASSETS_URL}/${image}`
    : null;
  const categories = useSelector((state: RootState) =>
    selectCategoriesById(state, categoriesIds),
  );
  const recipeCategories = categories.map((category) => category?.title);

  return (
    <div
      className={cn(styles.card, styles[direction])}
      role="button"
      onClick={onClick}
    >
      {cardImage && (
        <div className={styles["image-wrapper"]}>
          <img src={cardImage} alt="recipe-image" />
        </div>
      )}
      <div className={styles["card-content"]}>
        {title && (
          <UiTypography
            className={cn(styles["card-title"], "text-ellipsis")}
            variant="xl"
            fontWeight="medium"
          >
            {title}
          </UiTypography>
        )}
        {description && (
          <div className={styles["card-description"]}>
            <Truncate lines={3} ellipsis="...">
              <UiTypography variant="sm" fontWeight="regular">
                {description}
              </UiTypography>
            </Truncate>
          </div>
        )}
        <div className={styles["card-labels"]}>
          <UiTag color="greenLimeSoft">{recipeCategories.concat(", ")}</UiTag>
          <UserStats bookmarksCount={bookmarks} likesCount={likes} />
        </div>
      </div>
      {actions && <div>{actions}</div>}
    </div>
  );
};

export default RecipeCard;
