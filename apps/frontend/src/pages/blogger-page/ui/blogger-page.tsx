import BloggerPageHeader from "./blogger-page-header";

import styles from "./blogger-page.module.scss";

const BloggerPage = () => {
  return (
    <div className={styles.page}>
      <BloggerPageHeader />
    </div>
  );
};

export default BloggerPage;
