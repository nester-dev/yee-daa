import { type FC, type ReactNode, useState } from "react";
import cn from "clsx";

import { UserStats } from "@/entities/user-stats";

import ImagePlaceholder from "@/shared/assets/icons/image-placeholder.svg?react";
import { UiTypography } from "@/shared/ui/ui-typography";

import styles from "./recipe-card.module.scss";

type Props = {
  title?: string;
  description?: string;
  image?: string;
  likes?: number;
  bookmarks?: number;
  direction?: "column" | "row";
  actions?: ReactNode;
  onClick?: () => void;
  showImage?: boolean;
  className?: string;
  hideDescription?: boolean;
  cardHeader?: ReactNode;
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
  cardHeader,
}) => {
  const [isImageUrlValid, setIsImageUrlValid] = useState<boolean | null>(null);
  const imageSrc = `${import.meta.env.VITE_ASSETS_URL}/${image}`;

  return (
    <div
      className={cn(styles.card, styles[direction], className)}
      role="button"
      onClick={onClick}
    >
      {showImage && (
        <div className={styles["image-wrapper"]}>
          <img
            className={cn(!isImageUrlValid && styles["hide"])}
            src={imageSrc}
            alt="recipe-image"
            onLoad={() => setIsImageUrlValid(true)}
            onError={() => setIsImageUrlValid(false)}
          />
          {!isImageUrlValid && (
            <div className={styles["image-placeholder"]}>
              <ImagePlaceholder />
            </div>
          )}
        </div>
      )}
      <div className={styles["card-wrapper"]}>
        <div className={styles["card-content"]}>
          {title && (
            <UiTypography
              variant="xl"
              fontWeight="medium"
              className={cn(styles["card-title"], "text-ellipsis")}
            >
              {title}
            </UiTypography>
          )}
          {description && (
            <div
              className={cn(
                styles["card-description"],
                "text-ellipsis",
                hideDescription && styles["card-description--hide"],
              )}
            >
              <UiTypography variant="sm" fontWeight="regular">
                {description}
              </UiTypography>
            </div>
          )}
          <div className={styles["card-labels"]}>
            {cardHeader ? (
              cardHeader
            ) : (
              <UserStats
                bookmarksCount={bookmarks}
                likesCount={likes}
                className={styles["card-labels--stats"]}
              />
            )}
          </div>
        </div>
        {actions && <div>{actions}</div>}
      </div>
    </div>
  );
};

export default RecipeCard;
