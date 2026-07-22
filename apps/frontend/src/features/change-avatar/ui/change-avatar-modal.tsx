import { type FC, useRef, useState } from "react";

import { matchHttpError } from "@/shared/api/match-http-error";
import { showNotification } from "@/shared/lib/show-notification";
import UiButton from "@/shared/ui/ui-button/ui-button";
import UiImageUpload, {
  type UiImageUploadRef,
} from "@/shared/ui/ui-image-upload/ui-image-upload";
import UiModal from "@/shared/ui/ui-modal/ui-modal";
import { UiTypography } from "@/shared/ui/ui-typography";

import { useChangeAvatarMutation } from "../api/change-avatar-api";

type TProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ChangeAvatarModal: FC<TProps> = ({ isOpen, onClose }) => {
  const imageUploadRef = useRef<UiImageUploadRef>(null);

  const [preview, setPreview] = useState<string>();
  const [changeAvatar, { isLoading }] = useChangeAvatarMutation();

  const handleClose = () => {
    setPreview(undefined);
    onClose();
  };

  const handleAvatarChange = async () => {
    try {
      const file = await imageUploadRef.current?.getCroppedFile();

      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);

      await changeAvatar(formData).unwrap();

      handleClose();
    } catch (error) {
      matchHttpError(error, {
        default: () => {
          showNotification({
            title: "Ошибка сервера",
            text: "Попробуйте позже.",
            variant: "error",
          });
        },
      });
    }
  };

  return (
    <UiModal
      isOpen={isOpen}
      onClose={handleClose}
      header={
        <UiTypography variant="xxl" fontWeight="bold" align="center">
          Изменить
          <br />
          изображение профиля
        </UiTypography>
      }
      content={
        <UiImageUpload
          ref={imageUploadRef}
          preview={preview}
          setPreview={setPreview}
        />
      }
      footer={<ModalFooter onClick={handleAvatarChange} disabled={isLoading} />}
    />
  );
};

export default ChangeAvatarModal;

type TFooterProps = {
  onClick: () => void;
  disabled: boolean;
};

const ModalFooter = ({ onClick, disabled }: TFooterProps) => (
  <UiButton color="secondary" disabled={disabled} onClick={onClick}>
    <UiTypography variant="lg" fontWeight="semibold" color="white">
      Кадрировать и сохранить
    </UiTypography>
  </UiButton>
);
