import { useIsMobileDevice } from "@/shared/lib/use-media-query";
import { UiTypography } from "@/shared/ui/ui-typography";

import { AllAuthorsButton } from "./all-authors-button";
import { BlogsList } from "./blogs-list";

import styles from "./food-blogs.module.scss";

export const FoodBlogs = () => {
  const isMobile = useIsMobileDevice();
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <UiTypography variant="xl-4" fontWeight="medium">
          Кулинарные блоги
        </UiTypography>
        {!isMobile && <AllAuthorsButton />}
      </div>
      <BlogsList />
      {isMobile && <AllAuthorsButton />}
    </div>
  );
};
