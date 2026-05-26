import { useState } from "react";

import { BloggerNote, type BloggerNoteType } from "@/entities/bloggers";

import UiButton from "@/shared/ui/ui-button/ui-button";
import { UiTypography } from "@/shared/ui/ui-typography";

import styles from "./blogger-page.module.scss";

const BloggerNotesList = ({ notes }: { notes: BloggerNoteType[] }) => {
  const [showAll, setShowAll] = useState(false);
  if (notes.length === 0) {
    return null;
  }

  const displayShowMoreButton = !showAll && notes.length > 3;
  const notesToShow = showAll ? notes : notes.slice(0, 3);

  return (
    <div className={styles.notes}>
      <div className={styles["notes-heading"]}>
        <UiTypography variant="xl-4">Заметки</UiTypography>
        <span className={styles["notes-count"]}>{`(${notes.length})`}</span>
      </div>
      <div className={styles["notes-list"]}>
        {notesToShow.map((note) => (
          <BloggerNote key={note.date} {...note} />
        ))}
      </div>
      {displayShowMoreButton && (
        <UiButton
          variant="text"
          className={styles["notes-show-more"]}
          onClick={() => setShowAll((prev) => !prev)}
        >
          <UiTypography variant="sm" fontWeight="semibold">
            Показать больше
          </UiTypography>
        </UiButton>
      )}
    </div>
  );
};

export default BloggerNotesList;
