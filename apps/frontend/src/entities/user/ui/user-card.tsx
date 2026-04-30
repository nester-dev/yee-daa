import { UiTypography } from "@/shared/ui/ui-typography";

import UserAvatar from "./user-avatar";

import styles from "./user-card.module.scss";

type Props = {
  photo: string;
  firstName: string;
  lastName: string;
  login: string;
};

const UserCard = ({ photo, firstName, lastName, login }: Props) => {
  return (
    <div className={styles.author}>
      <UserAvatar photo={photo} />
      <div className={styles.identity}>
        <UiTypography variant="lg" fontWeight="medium" className={styles.name}>
          {firstName} {lastName}fsadfasddsfasdfdsf
        </UiTypography>
        <UiTypography variant="sm" color="blackOverlay">
          @{login}
        </UiTypography>
      </div>
    </div>
  );
};

export default UserCard;
