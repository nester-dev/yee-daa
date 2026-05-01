import type { FC, ReactNode } from "react";
import cn from "clsx";

import type { Blogger } from "@/entities/bloggers";

import { BloggerCardBody } from "./blogger-card-body.tsx";
import { BloggerCardHeader } from "./blogger-card-header.tsx";

import styles from "./blogger-card.module.scss";

type Props = {
  blogger: Blogger;
  className?: string;
  footer?: ReactNode;
};

const BloggerCard: FC<Props> = ({ blogger, className, footer }) => {
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
      {footer}
    </article>
  );
};

export default BloggerCard;
