import { type FC, useCallback } from "react";
import { useFormContext } from "react-hook-form";

import { ImageUpload } from "@/features/image-upload";

import type { PublishRecipeSchemaType } from "../../model/publish-recipe-schema.ts";

import RecipeMeta from "./recipe-meta.tsx";

import styles from "./recipe-header-section.module.scss";

const RecipeHeaderSection: FC = () => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<PublishRecipeSchemaType>();
  const image = watch("image");

  const onUploadSuccess = useCallback(
    (url: string) => {
      setValue("image", url);
    },
    [setValue],
  );

  return (
    <section className={styles.section}>
      <ImageUpload
        className={styles.uploader}
        onUploadSuccess={onUploadSuccess}
        preview={image}
        error={errors.image?.message}
      />
      <RecipeMeta />
    </section>
  );
};

export default RecipeHeaderSection;
