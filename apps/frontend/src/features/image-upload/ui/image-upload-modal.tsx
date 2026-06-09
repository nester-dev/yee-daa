import { type ChangeEvent, type FC, useEffect, useRef, useState } from "react";

import { HttpStatus } from "@/shared/api/http-status";
import { matchHttpError } from "@/shared/api/match-http-error";
import { showNotification } from "@/shared/lib/show-notification";
import UiButton from "@/shared/ui/ui-button/ui-button";
import UiImage from "@/shared/ui/ui-image/ui-image";
import UiModal from "@/shared/ui/ui-modal/ui-modal";
import { UiTypography } from "@/shared/ui/ui-typography";

import { useUploadFileMutation } from "../api/file-api";

import styles from "./image-upload.module.scss";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (url: string) => void;
};

const ImageUploadModal: FC<Props> = ({ isOpen, onClose, onSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | undefined>(undefined);

  const handleClose = () => {
    setFile(null);
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
        <Content preview={preview} setFile={setFile} setPreview={setPreview} />
      }
      footer={
        <Footer file={file} onSuccess={onSuccess} onClose={handleClose} />
      }
    />
  );
};

export default ImageUploadModal;

type ContentProps = {
  preview: string | undefined;
  setFile: (file: File | null) => void;
  setPreview: (preview: string | undefined) => void;
};

const Content: FC<ContentProps> = ({ preview, setFile, setPreview }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(selectedFile);
  };
  return (
    <button
      className={styles.preview}
      onClick={() => inputRef.current?.click()}
    >
      <UiImage className={styles.image} src={preview} alt="recipe-image" />
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
    </button>
  );
};

type FooterProps = {
  file: File | null;
  onSuccess?: (url: string) => void;
  onClose: () => void;
};

const Footer: FC<FooterProps> = ({ file, onSuccess, onClose }) => {
  const [uploadFile, { isSuccess, error, data, reset }] =
    useUploadFileMutation();

  useEffect(() => {
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
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      onSuccess?.(data?.url || "");
      reset();
    }
  }, [isSuccess, data, onSuccess, reset]);

  if (!file) return null;

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    await uploadFile(formData);
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
