import type { FC } from "react";

import { UserCard } from "@/entities/user";

import { UiTypography } from "@/shared/ui/ui-typography";

import styles from "./blogger-card.module.scss";

type Props = {
  firstName: string;
  lastName: string;
  login: string;
  photo: string;
  newRecipesCount: number;
};

export const BloggerCardHeader: FC<Props> = ({
  firstName,
  lastName,
  login,
  photo,
  newRecipesCount,
}) => {
  return (
    <div className={styles.header}>
      <UserCard
        photo={photo}
        firstName={firstName}
        lastName={lastName}
        login={login}
      />
      {newRecipesCount > 0 && (
        <div className={styles.badge}>
          <UiTypography variant="xs" fontWeight="medium">
            {newRecipesCount} новый рецепт
          </UiTypography>
        </div>
      )}
    </div>
  );
};
