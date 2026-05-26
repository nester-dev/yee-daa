import { useParams } from "react-router";

import { useGetRecipesByUserIdQuery } from "@/entities/recipe";

import BloggerNotesList from "./blogger-notes-list";
import BloggerPageHeader from "./blogger-page-header";
import BloggerRecipesList from "./blogger-recipes-list";

import styles from "./blogger-page.module.scss";

const BloggerPage = () => {
  const userId = useParams()?.bloggerId || "";
  const { data } = useGetRecipesByUserIdQuery(userId);

  return (
    <div className={styles.page}>
      <BloggerPageHeader />
      <BloggerRecipesList recipes={data?.recipes ?? []} />
      <BloggerNotesList notes={data?.notes ?? []} />
    </div>
  );
};

export default BloggerPage;
