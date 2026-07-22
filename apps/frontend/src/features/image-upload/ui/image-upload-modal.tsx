import { type FC, type RefObject, useRef, useState } from "react";

import { HttpStatus } from "@/shared/api/http-status";
import { matchHttpError } from "@/shared/api/match-http-error";
import { showNotification } from "@/shared/lib/show-notification";
import UiButton from "@/shared/ui/ui-button/ui-button";
import UiImageUpload, {
  type UiImageUploadRef,
} from "@/shared/ui/ui-image-upload/ui-image-upload";
import UiModal from "@/shared/ui/ui-modal/ui-modal";
import { UiTypography } from "@/shared/ui/ui-typography";

import { useUploadFileMutation } from "../api/file-api";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (url: string) => void;
  withCrop?: boolean;
};

const ImageUploadModal: FC<Props> = ({
  isOpen,
  onClose,
  onSuccess,
  withCrop = true,
}) => {
  const imageUploadRef = useRef<UiImageUploadRef>(null);
  const [preview, setPreview] = useState<string | undefined>(undefined);

  const handleClose = () => {
    setPreview(undefined);
    onClose();
  };

  return (
    <UiModal
      isOpen={isOpen}
      onClose={handleClose}
      header={
        <UiTypography fontWeight="bold" variant="xxl" align="center">
          Изображение
        </UiTypography>
      }
      content={
        <UiImageUpload
          ref={imageUploadRef}
          preview={preview}
          setPreview={setPreview}
          withCrop={withCrop}
        />
      }
      footer={
        <Footer
          hasFile={Boolean(preview)}
          imageUploadRef={imageUploadRef}
          onSuccess={onSuccess}
          onClose={handleClose}
        />
      }
    />
  );
};

export default ImageUploadModal;

type FooterProps = {
  hasFile: boolean;
  imageUploadRef: RefObject<UiImageUploadRef | null>;
  onSuccess?: (url: string) => void;
  onClose: () => void;
};

const Footer: FC<FooterProps> = ({
  hasFile,
  imageUploadRef,
  onSuccess,
  onClose,
}) => {
  const [uploadFile, { reset }] = useUploadFileMutation();

  if (!hasFile) return null;

  const handleUpload = async () => {
    const file = await imageUploadRef.current?.getUploadFile();

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await uploadFile(formData).unwrap();
      onSuccess?.(response.url || "");
      reset();
    } catch (error) {
      matchHttpError(error, {
        [HttpStatus.BAD_REQUEST]: (message) => {
          showNotification({
            title: message,
            variant: "error",
          });
        },
        default: () => {
          showNotification({
            title: "Ошибка сервера",
            text: "Попробуйте немного позже",
            variant: "error",
          });
        },
      });
    }
    onClose();
  };

  return (
    <UiButton color="secondary" onClick={handleUpload}>
      <UiTypography variant="lg" fontWeight="semibold" color="white">
        Сохранить
      </UiTypography>
    </UiButton>
  );
};
