import { useGetRecipesByUserIdQuery } from "@/entities/recipe";

import { decodeAccessToken } from "@/shared/api/jwt-decode";

export const useBookmarks = (recipeId?: string) => {
  const userId = decodeAccessToken()?.userId;
  const { data: userRecipes } = useGetRecipesByUserIdQuery(userId ?? "", {
    skip: !userId,
  });
  const isBookmarked = userRecipes?.myBookmarks.some(
    (recipe) => recipe._id === recipeId,
  );

  return {
    isBookmarked,
    bookmarks: userRecipes?.myBookmarks || [],
  };
};
