import type { FC } from "react";
import cn from "clsx";

import type { Blogger } from "@/entities/bloggers/model/types.ts";
import UserStats from "@/entities/user-stats/ui/user-stats.tsx";

import UiButton from "@/shared/ui/ui-button/ui-button.tsx";
import { UiTypography } from "@/shared/ui/ui-typography";

import { BloggerCardBody } from "./blogger-card-body.tsx";
import { BloggerCardHeader } from "./blogger-card-header.tsx";

import styles from "./blogger-card.module.scss";

type Props = {
  blogger: Blogger;
  className?: string;
  showFooter?: boolean;
};

const BloggerCard: FC<Props> = ({ blogger, className, showFooter = true }) => {
  const note = blogger.notes[0];
  const photo = blogger.photoLink.startsWith("http")
    ? blogger.photoLink
    : `${import.meta.env.VITE_ASSETS_URL}/${blogger.photoLink}`;

  return (
    <article className={cn(styles.card, className)}>
      <BloggerCardHeader
        firstName={blogger.firstName}
        lastName={blogger.lastName}
        login={blogger.login}
        newRecipesCount={blogger.newRecipesCount}
        photo={photo}
      />
      <BloggerCardBody note={note?.text} />
      {showFooter && (
        <div className={styles.footer}>
          <div className={styles.actions}>
            <UiButton size="sm" color="success" variant="solid">
              <UiTypography variant="xs" fontWeight="semibold">
                Рецепт
              </UiTypography>
            </UiButton>
            <UiButton size="sm" color="success" variant="outlined">
              <UiTypography variant="xs" fontWeight="semibold">
                Читать
              </UiTypography>
            </UiButton>
          </div>
          <UserStats
            size="small"
            direction="row"
            bookmarksCount={blogger.bookmarksCount}
            followersCount={blogger.subscribersCount}
            className={styles.stats}
          />
        </div>
      )}
    </article>
  );
};

export default BloggerCard;
