import { Link } from "react-router";

import ArrowIcon from "@/shared/assets/icons/arrow-left.svg?react";
import UiIconButton from "@/shared/ui/ui-icon-button/ui-icon-button";
import { UiTypography } from "@/shared/ui/ui-typography";

import styles from "./settings-page.module.scss";

const ContactDeveloper = () => {
  return (
    <div>
      <UiTypography variant="xxl" fontWeight="bold">
        О проекте
      </UiTypography>
      <UiTypography fontWeight="medium" className={styles.contact}>
        Связаться с{" "}
        <Link
          className={styles["contact--link"]}
          to="https://t.me/nesterDev"
          target="_blank"
          rel="noopener noreferrer"
        >
          разработчиком
        </Link>
        <UiIconButton size="xs" className={styles["contact--icon"]}>
          <ArrowIcon />
        </UiIconButton>
      </UiTypography>
    </div>
  );
};

export default ContactDeveloper;
