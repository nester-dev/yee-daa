import type { FC } from "react";

import { BloggerActions } from "@/widgets/blogger-actions";

import { type Blogger, BloggerCard } from "@/entities/bloggers";

import { UiTypography } from "@/shared/ui/ui-typography";

import styles from "./blogs-page.module.scss";

type Props = {
  data: Blogger[];
};

const FavoriteBlogsList: FC<Props> = ({ data }) => {
  return (
    <div className={styles["favorite-blogs"]}>
      <UiTypography variant="xl-4">Избранные блоги</UiTypography>
      <div className={styles["favorite-blogs-list"]}>
        {data?.map((blogger) => (
          <BloggerCard
            blogger={blogger}
            key={blogger._id}
            footer={<BloggerActions {...blogger} />}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoriteBlogsList;
