import { useParams } from "react-router";
import cn from "clsx";

import { useCategoriesList } from "@/entities/category";

import MenuCategory from "./menu-category.tsx";

import styles from "./Menu.module.scss";

const Menu = () => {
  const params = useParams();
  const { data } = useCategoriesList();

  return (
    <nav
      className={cn(styles.menu, params.subcategory && styles["menu-active"])}
    >
      <ul>
        {data?.map((category) => (
          <MenuCategory key={category._id} {...category} />
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
