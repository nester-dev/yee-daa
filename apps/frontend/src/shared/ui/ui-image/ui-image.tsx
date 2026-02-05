import { type FC, type ImgHTMLAttributes, useState } from "react";
import cn from "clsx";

import ImagePlaceholder from "@/shared/assets/icons/image-placeholder.svg?react";

import styles from "./ui-image.module.scss";

const UiImage: FC<ImgHTMLAttributes<HTMLImageElement>> = ({
  className,
  alt,
  src,
  ...rest
}) => {
  const [isImageUrlValid, setIsImageUrlValid] = useState<boolean | null>(null);

  return (
    <div
      className={cn(
        styles.container,
        className,
        !isImageUrlValid && styles.error,
      )}
    >
      <img
        className={styles.image}
        src={src}
        {...rest}
        alt={alt}
        onLoad={() => setIsImageUrlValid(true)}
        onError={() => setIsImageUrlValid(false)}
      />
      {!isImageUrlValid && <ImagePlaceholder />}
    </div>
  );
};

export default UiImage;
