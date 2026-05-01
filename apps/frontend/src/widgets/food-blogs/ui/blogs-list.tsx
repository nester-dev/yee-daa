import { BloggerCard, useGetBloggersQuery } from "@/entities/bloggers";

import styles from "./food-blogs.module.scss";

export const BlogsList = () => {
  const { data } = useGetBloggersQuery({ limit: 20 });
  const filteredBloggers = data?.others?.filter(
    (blogger) => blogger.photoLink && blogger.notes.length,
  );

  return (
    <div className={styles.list}>
      {filteredBloggers?.slice(0, 3).map((blogger) => (
        <BloggerCard blogger={blogger} key={blogger._id} />
      ))}
    </div>
  );
};
