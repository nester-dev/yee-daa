import type { FC } from "react";
import { useNavigate } from "react-router";

import { BloggerActions } from "@/widgets/blogger-actions";
import { AllAuthorsButton } from "@/widgets/food-blogs";

import { type Blogger, BloggerCard } from "@/entities/bloggers";

import { ROUTE_PATHS } from "@/shared/config/route-paths";
import { UiTypography } from "@/shared/ui/ui-typography";

import styles from "./blogger-page.module.scss";

type Props = {
  data: Blogger[];
};

const OtherBlogsList: FC<Props> = ({ data }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(ROUTE_PATHS.FOOD_BLOGS);
  };

  return (
    <div className={styles["other-blogs"]}>
      <div className={styles["other-blogs-heading"]}>
        <UiTypography variant="xl-4" fontWeight="semibold">
          Другие блоги
        </UiTypography>
        {
          <AllAuthorsButton
            className={styles["other-blogs-button"]}
            onClick={handleClick}
          />
        }
      </div>
      <div className={styles["other-blogs-list"]}>
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

export default OtherBlogsList;
