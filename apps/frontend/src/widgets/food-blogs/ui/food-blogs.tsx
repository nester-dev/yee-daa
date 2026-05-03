import { useNavigate } from "react-router";

import { ROUTE_PATHS } from "@/shared/config/route-paths";
import { useIsMobileDevice } from "@/shared/lib/use-media-query";
import { UiTypography } from "@/shared/ui/ui-typography";

import { AllAuthorsButton } from "./all-authors-button";
import { BlogsList } from "./blogs-list";

import styles from "./food-blogs.module.scss";

export const FoodBlogs = () => {
  const isMobile = useIsMobileDevice();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(ROUTE_PATHS.FOOD_BLOGS);
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <UiTypography variant="xl-4" fontWeight="medium">
          Кулинарные блоги
        </UiTypography>
        {!isMobile && <AllAuthorsButton onClick={handleClick} />}
      </div>
      <BlogsList />
      {isMobile && <AllAuthorsButton onClick={handleClick} />}
    </div>
  );
};
