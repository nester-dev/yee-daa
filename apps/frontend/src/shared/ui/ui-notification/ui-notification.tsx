import type { FC } from "react";
import { type ToastContentProps } from "react-toastify";
import cn from "clsx";

import AlertIcon from "@/shared/assets/icons/alert-icon.svg?react";
import CheckIcon from "@/shared/assets/icons/check-icon.svg?react";
import CloseIcon from "@/shared/assets/icons/close-icon.svg?react";
import UiIconButton from "@/shared/ui/ui-icon-button/ui-icon-button.tsx";
import { UiTypography } from "@/shared/ui/ui-typography";

import styles from "./ui-notification.module.scss";

type Props = Partial<ToastContentProps> & {
  title: string;
  text: string;
  variant: "error" | "success";
};

const UiNotification: FC<Props> = ({ title, text, variant, closeToast }) => {
  const IconComponent = variant === "success" ? CheckIcon : AlertIcon;

  return (
    <div
      className={cn(styles["notification"], styles[`notification-${variant}`])}
    >
      <IconComponent className={styles["notification-icon"]} />
      <div>
        {title && (
          <UiTypography color="white" fontWeight="bold">
            {title}
          </UiTypography>
        )}
        {text && <UiTypography color="white">{text}</UiTypography>}
      </div>
      <UiIconButton
        onClick={closeToast}
        className={styles["notification-close"]}
        size="inherit"
      >
        <CloseIcon />
      </UiIconButton>
    </div>
  );
};

export default UiNotification;
