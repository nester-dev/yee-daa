import { type FC, type ReactNode } from "react";
import { Truncate } from "@re-dev/react-truncate";
import cn from "clsx";

import type { RecipeType } from "@/entities/recipe/model/types.ts";
import { UserStats } from "@/entities/user-stats";

import { useIsAboveLaptopDevice } from "@/shared/lib/use-media-query.ts";
import { UiTypography } from "@/shared/ui/ui-typography";

import styles from "./recipe-card.module.scss";

type Props = RecipeType & {
  direction?: "column" | "row";
  actions?: ReactNode;
  onClick?: () => void;
  showImage?: boolean;
  className?: string;
  hideDescription?: boolean;
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
  showImage = true,
  className,
  hideDescription,
}) => {
  const isAboveLaptopDevice = useIsAboveLaptopDevice();
  const cardImage = image
    ? `${import.meta.env.VITE_ASSETS_URL}/${image}`
    : null;

  return (
    <div
      className={cn(styles.card, styles[direction], className)}
      role="button"
      onClick={onClick}
    >
      {cardImage && showImage && (
        <div className={styles["image-wrapper"]}>
          <img src={cardImage} alt="recipe-image" />
        </div>
      )}
      <div className={styles["card-wrapper"]}>
        <div className={styles["card-content"]}>
          {title && (
            <Truncate
              lines={isAboveLaptopDevice ? 2 : 1}
              ellipsis="..."
              className={styles["card-title"]}
            >
              <UiTypography variant="xl" fontWeight="medium">
                {title}
              </UiTypography>
            </Truncate>
          )}
          {description && (
            <div
              className={cn(
                styles["card-description"],
                hideDescription && styles["card-description--hide"],
              )}
            >
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
