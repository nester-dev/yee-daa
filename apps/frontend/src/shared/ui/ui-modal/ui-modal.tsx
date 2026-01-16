import { type FC, type ReactElement } from "react";
import { createPortal } from "react-dom";
import cn from "clsx";
import { AnimatePresence } from "framer-motion";

import CloseIcon from "@/shared/assets/icons/cross-icon.svg?react";
import { usePortalRoot } from "@/shared/lib/usePortalRoot.ts";
import UiBackdrop from "@/shared/ui/ui-backdrop/ui-backdrop.tsx";
import UiIconButton from "@/shared/ui/ui-icon-button/ui-icon-button.tsx";

import styles from "./ui-modal.module.scss";

export type ModalProps = {
  header?: ReactElement;
  content?: ReactElement;
  footer?: ReactElement;
  onClose?: () => void;
  isOpen: boolean;
  className?: string;
};

const UiModal: FC<ModalProps> = ({
  isOpen,
  onClose,
  header,
  content,
  footer,
  className,
}) => {
  const modalRoot = usePortalRoot({
    isOpen,
    lockScrollOnOpen: true,
  });

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <UiBackdrop onClick={onClose} className={styles.backdrop}>
          <div
            className={cn(styles.modal, className)}
            onClick={(e) => e.stopPropagation()}
          >
            <UiIconButton
              size="sm"
              onClick={onClose}
              className={styles["close-icon"]}
            >
              <CloseIcon />
            </UiIconButton>
            {header}
            {content}
            {footer}
          </div>
        </UiBackdrop>
      )}
    </AnimatePresence>,
    modalRoot,
  );
};

export default UiModal;
