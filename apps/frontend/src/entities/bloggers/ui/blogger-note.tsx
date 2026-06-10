import type { FC, PropsWithChildren } from "react";
import { format, isValid, parseISO } from "date-fns";
import { ru } from "date-fns/locale";

import { UiTypography } from "@/shared/ui/ui-typography";

import type { BloggerNoteType } from "../model/types";

import styles from "./blogger-note.module.scss";

type Props = BloggerNoteType & PropsWithChildren;

const BloggerNote: FC<Props> = ({ date, text, children }) => {
  const parsedDate = parseISO(date);
  const formattedDate = isValid(parsedDate)
    ? format(parsedDate, "d MMMM HH:mm", { locale: ru })
    : date;

  return (
    <div className={styles.note}>
      <div className={styles["note-header"]}>
        <UiTypography color="greenPrimary" variant="sm">
          {formattedDate}
        </UiTypography>
        {children}
      </div>
      <UiTypography variant="sm">{text}</UiTypography>
    </div>
  );
};

export default BloggerNote;
