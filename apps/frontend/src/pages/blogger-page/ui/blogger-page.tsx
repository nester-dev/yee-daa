import BloggerPageHeader from "./blogger-page-header";
import BloggerRecipesList from "./blogger-recipes-list";

import styles from "./blogger-page.module.scss";

const BloggerPage = () => {
  return (
    <div className={styles.page}>
      <BloggerPageHeader />
      <BloggerRecipesList />
    </div>
  );
};

export default BloggerPage;
