import type { FC } from "react";

import VerificationImage from "@/shared/assets/img/verification-image.png";
import UiModal, { type ModalProps } from "@/shared/ui/ui-modal/ui-modal.tsx";
import { UiTypography } from "@/shared/ui/ui-typography";

import styles from "./verification-modal.module.scss";

type Props = Pick<ModalProps, "isOpen" | "onClose">;

const VerificationModal: FC<Props> = ({ isOpen, onClose }) => (
  <UiModal
    className={styles.verification}
    isOpen={isOpen}
    onClose={onClose}
    header={
      <img
        src={VerificationImage}
        alt="verification-image"
        className={styles["verification-image"]}
      />
    }
    content={<VerificationContent />}
    footer={
      <UiTypography variant="xs" className={styles["verification-notice"]}>
        Остались вопросы? Свяжитесь с поддержкой
      </UiTypography>
    }
  />
);

const VerificationContent = () => (
  <div className={styles["verification-content"]}>
    <UiTypography variant="xxl" fontWeight="bold">
      Упс! Что-то пошло не так
    </UiTypography>
    <UiTypography color="blackOverlay">
      Ваша ссылка для верификации недействительна. Попробуйте зарегистрироваться
      снова.
    </UiTypography>
  </div>
);

export default VerificationModal;
