import { useGetRecipesByUserIdQuery } from "@/entities/recipe";
import { useGetMeQuery } from "@/entities/user";

import RecipesList from "./recipes-list";
import UserInfo from "./user-info";

import styles from "./profile-page.module.scss";

const ProfilePage = () => {
  const { data } = useGetMeQuery();
  const userId = data?._id;
  const { data: recipes } = useGetRecipesByUserIdQuery(userId ?? "", {
    skip: !userId,
  });

  if (!data) {
    return null;
  }

  return (
    <div className={styles.container}>
      <UserInfo
        {...data}
        totalBookmarks={recipes?.totalBookmarks || 0}
        totalSubscribers={recipes?.totalSubscribers || 0}
      />

      <div className={styles.content}>
        <RecipesList
          recipes={recipes?.recipes || []}
          drafts={data?.drafts || []}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
