import type { FC } from "react";
import cn from "clsx";
import { OTPInput } from "input-otp";

import OtpImage from "@/shared/assets/img/user-with-tablet.png";
import UiModal, { type ModalProps } from "@/shared/ui/ui-modal/ui-modal.tsx";
import { UiTypography } from "@/shared/ui/ui-typography";

import styles from "./otp-verification.module.scss";

type Props = Pick<ModalProps, "isOpen" | "onClose"> & {
  email?: string;
};

const OtpVerificationModal: FC<Props> = ({ isOpen, onClose, email }) => {
  return (
    <UiModal
      isOpen={isOpen}
      onClose={onClose}
      className={styles.verification}
      header={
        <img
          src={OtpImage}
          className={styles["verification-image"]}
          alt="user-with-tablet"
        />
      }
      content={<VerificationContent email={email} />}
      footer={
        <UiTypography
          className={styles["verification-notice"]}
          variant="xs"
          align="center"
        >
          Не пришло письмо? Проверьте папку Спам.
        </UiTypography>
      }
    />
  );
};

const VerificationContent: FC<Pick<Props, "email">> = ({ email }) => {
  return (
    <div className={styles["verification-content"]}>
      <UiTypography align="center">
        Мы отправили вам на e-mail{"\n"}
        <span className={styles["verification-email"]}>{email}</span>
        {"\n"}
        шестизначный код. Введите его ниже.
      </UiTypography>
      <OTPInput
        maxLength={6}
        containerClassName={styles.otp}
        render={({ slots }) => (
          <>
            <div className={styles["otp-content"]}>
              {slots.map((slot, idx) => (
                <div
                  className={cn(
                    styles["otp-slot"],
                    slot.isActive && styles["otp-slot--active"],
                    !slot.char && styles["otp-slot--empty"],
                  )}
                  key={idx}
                >
                  {slot.char ?? slot.placeholderChar}
                </div>
              ))}
            </div>
          </>
        )}
      />
    </div>
  );
};

export { OtpVerificationModal };
