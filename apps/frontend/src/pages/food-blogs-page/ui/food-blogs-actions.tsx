import { ToggleSubscriptionButton } from "@/features/toggle-subscription";

import type { Blogger } from "@/entities/bloggers";
import { UserStats } from "@/entities/user-stats";

import UiButton from "@/shared/ui/ui-button/ui-button";
import { UiTypography } from "@/shared/ui/ui-typography";

import styles from "./blogs-page.module.scss";

const FoodBlogsActions = (props: Blogger) => {
  const { bookmarksCount, subscribersCount, isFavorite, _id } = props;

  return (
    <div className={styles.footer}>
      <div className={styles.actions}>
        {isFavorite ? (
          <UiButton color="success" size="sm">
            <UiTypography variant="xs" fontWeight="semibold">
              Рецепты
            </UiTypography>
          </UiButton>
        ) : (
          <ToggleSubscriptionButton isSubscribed={isFavorite} bloggerId={_id} />
        )}
        <UiButton
          size="sm"
          color="success"
          variant="outlined"
          className={styles["actions-read"]}
        >
          <UiTypography variant="xs" fontWeight="semibold" color="greenPrimary">
            Читать
          </UiTypography>
        </UiButton>
      </div>
      <UserStats
        size="small"
        direction="row"
        bookmarksCount={bookmarksCount}
        followersCount={subscribersCount}
        className={styles.stats}
      />
    </div>
  );
};

export default FoodBlogsActions;
