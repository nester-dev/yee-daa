import { ChangeAvatarButton } from "@/features/change-avatar";

import { useGetMeQuery } from "@/entities/user";

import { UiTypography } from "@/shared/ui/ui-typography";

import styles from "./settings-page.module.scss";

const SettingsPage = () => {
  const { data } = useGetMeQuery();
  return (
    <div className={styles.container}>
      <UiTypography variant="xl" fontWeight="bold">
        Авторизация и персонализация
      </UiTypography>
      <ChangeAvatarButton avatar={data?.photoLink || ""} />
    </div>
  );
};

export default SettingsPage;
