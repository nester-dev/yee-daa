import { type ChangeEvent, type FC, useRef, useState } from "react";
import cn from "clsx";

import UiImage from "@/shared/ui/ui-image/ui-image.tsx";

import styles from "./ui-image-upload.module.scss";

type Props = {
  className?: string;
};

const UiImageUpload: FC<Props> = ({ className }) => {
  const [preview, setPreview] = useState<string | undefined>(undefined);
  const [file, setFile] = useState<File | null>(null);
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
      className={cn(styles.container, className)}
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

export default UiImageUpload;
