import { type FC, useState } from "react";

import { BloggerNote, type BloggerNoteType } from "@/entities/bloggers";

import PenIcon from "@/shared/assets/icons/pen-icon.svg?react";
import UiButton from "@/shared/ui/ui-button/ui-button";
import UiListCount from "@/shared/ui/ui-list-count/ui-list-count";
import { UiTypography } from "@/shared/ui/ui-typography";

import styles from "./notes-list.module.scss";

type Props = {
  notes: BloggerNoteType[];
  headingTextSize?: "large" | "medium";
  onNewNoteClick?: () => void;
};

const NotesList: FC<Props> = ({
  notes,
  headingTextSize = "large",
  onNewNoteClick,
}) => {
  const [showAll, setShowAll] = useState(false);
  const displayShowMoreButton = !showAll && notes.length > 3;
  const notesToShow = showAll ? notes : notes.slice(0, 3);

  return (
    <div className={styles.notes}>
      <div className={styles["notes-heading"]}>
        <UiListCount count={notes.length} size={headingTextSize}>
          Заметки
        </UiListCount>
        {onNewNoteClick && (
          <UiButton
            variant="outlined"
            size="sm"
            icon={<PenIcon />}
            onClick={onNewNoteClick}
          >
            <UiTypography variant="sm" fontWeight="semibold">
              Новая заметка
            </UiTypography>
          </UiButton>
        )}
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

export default NotesList;
