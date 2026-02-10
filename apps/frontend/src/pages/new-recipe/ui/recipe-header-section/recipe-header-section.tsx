import type { FC } from "react";

import UiImageUpload from "@/shared/ui/ui-image-upload/ui-image-upload.tsx";

import RecipeMeta from "./recipe-meta.tsx";

import styles from "./recipe-header-section.module.scss";

const RecipeHeaderSection: FC = () => {
  return (
    <section className={styles.section}>
      <UiImageUpload className={styles.uploader} />
      <RecipeMeta />
    </section>
  );
};

export default RecipeHeaderSection;
