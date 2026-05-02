import { NewRecipesSection } from "@/widgets/new-recipes-section";

import { useGetBloggersQuery } from "@/entities/bloggers";

import { UiTypography } from "@/shared/ui/ui-typography";

import FavoriteBlogsList from "./favorite-blogs-list";
import OthersBlogsList from "./others-blogs-list";

import styles from "./blogs-page.module.scss";

const FoodBlogsPage = () => {
  const { data } = useGetBloggersQuery({ limit: 30 });
  const favoriteBloggers = data?.favorites || [];

  const filteredBloggers = data?.others?.filter(
    (blogger) => blogger.photoLink && blogger.notes.length,
  );

  return (
    <div className={styles.container}>
      <UiTypography variant="title" fontWeight="bold" className={styles.title}>
        Кулинарные блоги
      </UiTypography>
      {favoriteBloggers?.length && (
        <FavoriteBlogsList data={favoriteBloggers} />
      )}
      <OthersBlogsList data={filteredBloggers?.slice(0, 9) || []} />
      <NewRecipesSection />
    </div>
  );
};

export default FoodBlogsPage;
