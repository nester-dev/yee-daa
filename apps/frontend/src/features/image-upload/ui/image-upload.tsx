import { type FC, useState } from "react";
import cn from "clsx";

import UiImage from "@/shared/ui/ui-image/ui-image";

import ImageUploadModal from "./image-upload-modal";

import styles from "./image-upload.module.scss";

type Props = {
  className?: string;
  onUploadSuccess?: (url: string) => void;
  preview?: string | undefined;
  error?: string;
};

const ImageUpload: FC<Props> = ({
  className,
  onUploadSuccess,
  preview,
  error,
}) => {
  const [showModal, setShowModal] = useState(false);
  const imagePreview = preview
    ? `${import.meta.env.VITE_ASSETS_URL}/${preview}`
    : undefined;

  return (
    <>
      <button
        className={cn(styles.container, className)}
        onClick={() => setShowModal(true)}
      >
        <UiImage
          className={styles.image}
          src={imagePreview}
          alt="recipe-image"
          error={error}
        />
      </button>
      <ImageUploadModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={onUploadSuccess}
        withCrop={false}
      />
    </>
  );
};

export default ImageUpload;
