import { useState } from "react";

import { NewRecipesSection } from "@/widgets/new-recipes-section";

import { useGetBloggersQuery } from "@/entities/bloggers";

import { UiTypography } from "@/shared/ui/ui-typography";

import { INITIAL_BLOGS_LIMIT } from "../config";

import FavoriteBlogsList from "./favorite-blogs-list";
import OthersBlogsList from "./others-blogs-list";

import styles from "./blogs-page.module.scss";

const FoodBlogsPage = () => {
  const [limit, setLimit] = useState<number | string>(INITIAL_BLOGS_LIMIT);
  const { data } = useGetBloggersQuery({ limit });
  const favoriteBloggers = data?.favorites || [];

  const handleLimitChange = () => {
    setLimit(limit === INITIAL_BLOGS_LIMIT ? "all" : INITIAL_BLOGS_LIMIT);
  };

  return (
    <div className={styles.container}>
      <UiTypography variant="title" fontWeight="bold" className={styles.title}>
        Кулинарные блоги
      </UiTypography>
      {favoriteBloggers?.length && (
        <FavoriteBlogsList data={favoriteBloggers} />
      )}
      <OthersBlogsList
        isCollapsed={limit === INITIAL_BLOGS_LIMIT}
        data={data?.others || []}
        onLimitChange={handleLimitChange}
      />
      <NewRecipesSection />
    </div>
  );
};

export default FoodBlogsPage;
