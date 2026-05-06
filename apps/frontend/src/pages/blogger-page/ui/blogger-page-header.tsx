import { useParams } from "react-router";

import { ToggleSubscriptionButton } from "@/features/toggle-subscription";

import { useGetBloggerByIdQuery } from "@/entities/bloggers";
import { UserCard } from "@/entities/user";
import { UserStats } from "@/entities/user-stats";

import styles from "./blogger-page.module.scss";

const BloggerPageHeader = () => {
  const id = useParams()?.bloggerId || "";
  const { data } = useGetBloggerByIdQuery(id);

  if (!data) {
    return null;
  }

  const { bloggerInfo, isFavorite, totalBookmarks, totalSubscribers } = data;
  const photo = bloggerInfo?.photoLink?.startsWith("http")
    ? bloggerInfo?.photoLink
    : `${import.meta.env.VITE_ASSETS_URL}/${bloggerInfo?.photoLink}`;

  return (
    <div className={styles.header}>
      <UserCard
        avatarSize="large"
        photo={photo}
        firstName={bloggerInfo?.firstName}
        lastName={bloggerInfo?.lastName}
        login={bloggerInfo?.login}
      >
        <div className={styles["header-stats"]}>
          <ToggleSubscriptionButton isSubscribed={isFavorite} bloggerId={id} />
          <UserStats
            size="small"
            direction="row"
            bookmarksCount={totalBookmarks}
            followersCount={totalSubscribers}
          />
        </div>
      </UserCard>
    </div>
  );
};

export default BloggerPageHeader;
