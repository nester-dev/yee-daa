import type { FC } from "react";
import cn from "clsx";

import { BloggerActions } from "@/widgets/blogger-actions";
import { AllAuthorsButton } from "@/widgets/food-blogs";

import { type Blogger, BloggerCard } from "@/entities/bloggers";

import styles from "./blogs-page.module.scss";

type Props = {
  data: Blogger[];
  isCollapsed: boolean;
  onLimitChange: () => void;
};

const OthersBlogsList: FC<Props> = ({ data, isCollapsed, onLimitChange }) => {
  return (
    <div className={styles["others-blogs"]}>
      <div className={styles["others-blogs-list"]}>
        {data?.map((blogger) => (
          <BloggerCard
            blogger={blogger}
            key={blogger._id}
            footer={<BloggerActions {...blogger} />}
          />
        ))}
      </div>
      <AllAuthorsButton
        onClick={onLimitChange}
        text={isCollapsed ? "Все авторы" : "Свернуть"}
        className={cn(
          styles["all-authors-button"],
          !isCollapsed && styles["all-authors-button-reversed"],
        )}
      />
    </div>
  );
};

export default OthersBlogsList;
