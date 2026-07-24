import { ChangeAvatarButton } from "@/features/change-avatar";
import { ChangeSettingsForm } from "@/features/change-settings";

import { useGetMeQuery } from "@/entities/user";

import { UiTypography } from "@/shared/ui/ui-typography";

import ContactDeveloper from "./contact-developer";

import styles from "./settings-page.module.scss";

const SettingsPage = () => {
  const { data } = useGetMeQuery();
  return (
    <div className={styles.container}>
      <UiTypography variant="xl" fontWeight="bold">
        Авторизация и персонализация
      </UiTypography>
      <ChangeAvatarButton
        className={styles["change-avatar"]}
        avatar={data?.photoLink || ""}
      />
      <ChangeSettingsForm
        key={data?._id ?? "loading"}
        firstName={data?.firstName}
        lastName={data?.lastName}
        login={data?.login}
        email={data?.email}
        className={styles.form}
      />
      <ContactDeveloper />
    </div>
  );
};

export default SettingsPage;
