import { type FC, type ReactElement } from "react";
import { createPortal } from "react-dom";
import cn from "clsx";
import { AnimatePresence } from "framer-motion";

import CloseIcon from "@/shared/assets/icons/cross-icon.svg?react";
import type { ModalTypes } from "@/shared/config/modal-types.ts";
import { useModal } from "@/shared/lib/use-modal.ts";
import { usePortalRoot } from "@/shared/lib/use-portal-root.ts";
import UiBackdrop from "@/shared/ui/ui-backdrop/ui-backdrop.tsx";
import UiIconButton from "@/shared/ui/ui-icon-button/ui-icon-button.tsx";

import styles from "./ui-modal.module.scss";

export type ModalProps = {
  header?: ReactElement;
  content?: ReactElement;
  footer?: ReactElement;
  onClose?: () => void;
  className?: string;
  modalType?: ModalTypes;
  isOpen?: boolean;
};

const UiModal: FC<ModalProps> = ({
  onClose,
  header,
  content,
  footer,
  className,
  modalType,
  isOpen,
}) => {
  const { getIsModalOpen, handleCloseModal } = useModal();
  const isModalOpen = getIsModalOpen(modalType) || !!isOpen;

  const modalRoot = usePortalRoot({
    isOpen: isModalOpen,
    lockScrollOnOpen: true,
  });

  const onModalClose = () => {
    handleCloseModal();
    onClose?.();
  };

  return createPortal(
    <AnimatePresence>
      {isModalOpen && (
        <UiBackdrop onClick={onModalClose} className={styles.backdrop}>
          <div
            className={cn(styles.modal, className)}
            onClick={(e) => e.stopPropagation()}
          >
            <UiIconButton
              size="sm"
              onClick={onModalClose}
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
