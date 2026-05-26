import { useParams } from "react-router";

import { useGetBloggersQuery } from "@/entities/bloggers";
import { useGetRecipesByUserIdQuery } from "@/entities/recipe";

import BloggerNotesList from "./blogger-notes-list";
import BloggerPageHeader from "./blogger-page-header";
import BloggerRecipesList from "./blogger-recipes-list";
import OtherBlogsList from "./other-blogs-list";

import styles from "./blogger-page.module.scss";

const BloggerPage = () => {
  const userId = useParams()?.bloggerId || "";
  const { data } = useGetRecipesByUserIdQuery(userId);
  const { data: bloggerData } = useGetBloggersQuery({ limit: 3 });

  return (
    <div className={styles.page}>
      <BloggerPageHeader />
      <BloggerRecipesList recipes={data?.recipes ?? []} />
      <BloggerNotesList notes={data?.notes ?? []} />
      <OtherBlogsList data={bloggerData?.others || []} />
    </div>
  );
};

export default BloggerPage;
