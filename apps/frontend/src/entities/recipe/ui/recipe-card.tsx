import { type FC, type ReactNode } from "react";
import { Truncate } from "@re-dev/react-truncate";
import cn from "clsx";

import type { RecipeType } from "@/entities/recipe/model/types.ts";
import { UserStats } from "@/entities/user-stats";

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
}) => {
  const cardImage = image
    ? `${import.meta.env.VITE_ASSETS_URL}/${image}`
    : null;

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
      <div className={styles["card-wrapper"]}>
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
            <UserStats
              bookmarksCount={bookmarks}
              likesCount={likes}
              className={styles["card-labels--stats"]}
            />
          </div>
        </div>
        {actions && <div>{actions}</div>}
      </div>
    </div>
  );
};

export default RecipeCard;
