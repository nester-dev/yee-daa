import type { FC } from "react";

import ConfirmationImage from "@/shared/assets/img/email-confirmation.png";
import UiModal, { type ModalProps } from "@/shared/ui/ui-modal/ui-modal.tsx";
import { UiTypography } from "@/shared/ui/ui-typography";

import styles from "./register-form.module.scss";

type Props = Pick<ModalProps, "modalType" | "onClose"> & {
  email?: string;
};

const EmailConfirmationModal: FC<Props> = ({ modalType, email, onClose }) => (
  <UiModal
    modalType={modalType}
    onClose={onClose}
    className={styles.confirmation}
    header={
      <img
        src={ConfirmationImage}
        alt="email-confirmation-image"
        className={styles["confirmation-image"]}
      />
    }
    content={<ConfirmationContent email={email} />}
    footer={
      <UiTypography className={styles["confirmation-notice"]} variant="xs">
        {
          "Не пришло письмо? Проверьте папку Спам.\nПо другим вопросам свяжитесь с поддержкой"
        }
      </UiTypography>
    }
  />
);

const ConfirmationContent: FC<Pick<Props, "email">> = ({ email }) => (
  <div className={styles["confirmation-content"]}>
    <UiTypography variant="xxl" fontWeight="bold">
      Остался последний шаг. Нужно верифицировать ваш e-mail
    </UiTypography>
    <UiTypography color="blackOverlay">
      Мы отправили вам на почту{"\n"}
      <span className={styles["confirmation-email"]}>{email}</span>
      {"\n"}
      ссылку для верификации.
    </UiTypography>
  </div>
);

export { EmailConfirmationModal };
