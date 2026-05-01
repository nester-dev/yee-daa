import type { FC } from "react";

import { type Blogger, BloggerCard } from "@/entities/bloggers";

import FoodBlogsActions from "./food-blogs-actions";

import styles from "./blogs-page.module.scss";

type Props = {
  data: Blogger[];
};

const OthersBlogsList: FC<Props> = ({ data }) => {
  console.log(data);
  return (
    <div className={styles["others-blogs"]}>
      <div className={styles["others-blogs-list"]}>
        {data?.map((blogger) => (
          <BloggerCard
            blogger={blogger}
            key={blogger._id}
            footer={<FoodBlogsActions {...blogger} />}
          />
        ))}
      </div>
    </div>
  );
};

export default OthersBlogsList;
