import { NotesList } from "@/widgets/notes-list";

import { NewNoteDrawer, useNoteDrawer } from "@/features/add-new-note";

import { useGetRecipesByUserIdQuery } from "@/entities/recipe";
import { useGetMeQuery } from "@/entities/user";

import BookmarksList from "./bookmarks-list";
import RecipesList from "./recipes-list";
import UserInfo from "./user-info";

import styles from "./profile-page.module.scss";

const ProfilePage = () => {
  const { isOpen, toggleNoteDrawer, openNoteDrawer } = useNoteDrawer();
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
      <NotesList
        notes={recipes?.notes || []}
        canDeleteNote={!!userId}
        headingTextSize="medium"
        onNewNoteClick={openNoteDrawer}
      />
      <BookmarksList />
      <NewNoteDrawer
        isOpen={isOpen}
        onClose={toggleNoteDrawer}
        title="Новая заметка"
      />
    </div>
  );
};

export default ProfilePage;
