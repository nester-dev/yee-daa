import type { FC } from "react";

import { UiTypography } from "@/shared/ui/ui-typography";

import styles from "./blogger-card.module.scss";

type Props = {
  note?: string;
};

export const BloggerCardBody: FC<Props> = ({ note }) => {
  return (
    <UiTypography variant="text" className={styles.note}>
      {note}
    </UiTypography>
  );
};
