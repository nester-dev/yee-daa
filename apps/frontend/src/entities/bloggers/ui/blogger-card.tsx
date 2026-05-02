import type { FC, ReactNode } from "react";
import cn from "clsx";

import type { Blogger } from "@/entities/bloggers";

import UiTag from "@/shared/ui/ui-tag/ui-tag.tsx";
import UiTypography from "@/shared/ui/ui-typography/ui-typography.tsx";

import { getNewRecipesText } from "../lib/get-new-recipes-text.ts";

import { BloggerCardBody } from "./blogger-card-body.tsx";
import { BloggerCardHeader } from "./blogger-card-header.tsx";

import styles from "./blogger-card.module.scss";

type Props = {
  blogger: Blogger;
  className?: string;
  footer?: ReactNode;
};

const BloggerCard: FC<Props> = ({ blogger, className, footer }) => {
  const { firstName, lastName, login, newRecipesCount, photoLink, isFavorite } =
    blogger;
  const note = blogger.notes[0];
  const photo = photoLink.startsWith("http")
    ? photoLink
    : `${import.meta.env.VITE_ASSETS_URL}/${photoLink}`;
  const showNewRecipesCount = newRecipesCount > 0 && isFavorite;

  return (
    <article className={cn(styles.card, className)}>
      <BloggerCardHeader
        firstName={firstName}
        lastName={lastName}
        login={login}
        newRecipesCount={newRecipesCount}
        photo={photo}
      />
      {showNewRecipesCount && (
        <UiTag icon={newRecipesCount} color="blackSoft" className={styles.tag}>
          <UiTypography variant="sm" tag="span">
            {getNewRecipesText(newRecipesCount)}
          </UiTypography>
        </UiTag>
      )}
      <BloggerCardBody note={note?.text} />
      {footer}
    </article>
  );
};

export default BloggerCard;
