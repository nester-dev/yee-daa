import type { FC } from "react";

import ImageUploader from "./image-uploader.tsx";
import RecipeMeta from "./recipe-meta.tsx";

import styles from "./recipe-header-section.module.scss";

const RecipeHeaderSection: FC = () => {
  return (
    <section className={styles.section}>
      <ImageUploader />
      <RecipeMeta />
    </section>
  );
};

export default RecipeHeaderSection;
