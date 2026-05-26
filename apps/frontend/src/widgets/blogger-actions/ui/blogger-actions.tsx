import { useNavigate } from "react-router";

import { ToggleSubscriptionButton } from "@/features/toggle-subscription";

import type { Blogger } from "@/entities/bloggers";
import { UserStats } from "@/entities/user-stats";

import { ROUTE_PATHS } from "@/shared/config/route-paths";
import UiButton from "@/shared/ui/ui-button/ui-button";
import { UiTypography } from "@/shared/ui/ui-typography";

import styles from "./blogger-actions.module.scss";

const BloggerActions = (props: Blogger) => {
  const navigate = useNavigate();
  const { bookmarksCount, subscribersCount, isFavorite, _id } = props;

  const handleRecipesClick = () => {
    navigate(`${ROUTE_PATHS.BLOGS}/${_id}`);
  };

  return (
    <div className={styles.footer}>
      <div className={styles.actions}>
        {isFavorite ? (
          <UiButton color="success" size="sm" onClick={handleRecipesClick}>
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

export default BloggerActions;
