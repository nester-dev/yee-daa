import { format, isValid, parseISO } from "date-fns";
import { ru } from "date-fns/locale";

import { UiTypography } from "@/shared/ui/ui-typography";

import type { BloggerNoteType } from "../model/types";

import styles from "./blogger-note.module.scss";

const BloggerNote = ({ date, text }: BloggerNoteType) => {
  const parsedDate = parseISO(date);
  const formattedDate = isValid(parsedDate)
    ? format(parsedDate, "d MMMM HH:mm", { locale: ru })
    : date;

  return (
    <div className={styles.note}>
      <UiTypography color="greenPrimary" variant="sm">
        {formattedDate}
      </UiTypography>
      <UiTypography variant="sm">{text}</UiTypography>
    </div>
  );
};

export default BloggerNote;
