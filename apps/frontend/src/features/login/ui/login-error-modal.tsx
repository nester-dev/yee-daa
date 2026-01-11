import type { FC } from "react";

import ErrorImage from "@/shared/assets/img/login-error.png";
import UiButton from "@/shared/ui/ui-button/ui-button.tsx";
import UiModal, { type ModalProps } from "@/shared/ui/ui-modal/ui-modal.tsx";
import { UiTypography } from "@/shared/ui/ui-typography";

import styles from "./login-form.module.scss";

type Props = Pick<ModalProps, "isOpen" | "onClose"> & {
  onRetry: () => void;
};

const LoginErrorModal: FC<Props> = ({ isOpen, onClose, onRetry }) => {
  return (
    <UiModal
      isOpen={isOpen}
      onClose={onClose}
      header={
        <img
          className={styles["error-image"]}
          src={ErrorImage}
          alt="login-error"
        />
      }
      content={<ErrorContent />}
      footer={
        <UiButton color="secondary" onClick={onRetry}>
          <UiTypography variant="lg" color="white" fontWeight="semibold">
            Повторить
          </UiTypography>
        </UiButton>
      }
    />
  );
};

const ErrorContent: FC = () => {
  return (
    <div className={styles["error-content"]}>
      <UiTypography variant="xxl" fontWeight="bold">
        Вход не выполнен
      </UiTypography>
      <UiTypography color="blackOverlay">
        {"Что-то пошло не так.\nПопробуйте еще раз"}
      </UiTypography>
    </div>
  );
};

export { LoginErrorModal };
