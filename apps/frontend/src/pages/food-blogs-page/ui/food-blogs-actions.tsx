import type { Blogger } from "@/entities/bloggers";
import { UserStats } from "@/entities/user-stats";

import PersonPlusIcon from "@/shared/assets/icons/person-plus-icon.svg?react";
import UiButton from "@/shared/ui/ui-button/ui-button";
import { UiTypography } from "@/shared/ui/ui-typography";

import styles from "./blogs-page.module.scss";

const FoodBlogsActions = (props: Blogger) => {
  const { bookmarksCount, subscribersCount, isFavorite } = props;

  return (
    <div className={styles.footer}>
      <div className={styles.actions}>
        <UiButton
          size="sm"
          color="secondary"
          variant="solid"
          icon={<PersonPlusIcon />}
        >
          <UiTypography variant="xs" fontWeight="semibold" color="white">
            {isFavorite ? "Вы подписаны" : "Подписаться"}
          </UiTypography>
        </UiButton>
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
