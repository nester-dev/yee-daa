import {
  ToggleBookmarkButton,
  useBookmarks,
} from "@/features/toggle-bookmarks";

import { CATEGORIES_DATA } from "@/entities/category";
import { RecipeCard, type RecipeType, useRecipeClick } from "@/entities/recipe";

import { ROUTE_PATHS } from "@/shared/config/route-paths";
import { useIsAboveLaptopDevice } from "@/shared/lib/use-media-query";
import UiListCount from "@/shared/ui/ui-list-count/ui-list-count";

import styles from "./profile-page.module.scss";

const BookmarksList = () => {
  const { bookmarks } = useBookmarks();
  const handleRecipeClick = useRecipeClick();
  const isAboveLaptopDevice = useIsAboveLaptopDevice();

  const onRecipeClick = (recipe: RecipeType) => {
    handleRecipeClick(
      recipe,
      CATEGORIES_DATA,
      `${ROUTE_PATHS.EDIT_RECIPE}/:category/:subcategory/:recipeId`,
    );
  };

  return (
    <div className={styles.bookmarks}>
      <UiListCount count={bookmarks.length} size="medium">
        Мои закладки
      </UiListCount>
      <div className={styles["bookmarks__list"]}>
        {bookmarks.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            {...recipe}
            direction="row"
            onClick={() => onRecipeClick(recipe)}
            hideDescription={isAboveLaptopDevice}
            actions={
              <ToggleBookmarkButton isBookmarked recipeId={recipe._id} />
            }
          />
        ))}
      </div>
    </div>
  );
};

export default BookmarksList;
