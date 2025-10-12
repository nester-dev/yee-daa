import styles from "./Menu.module.scss";
import { MENU_DATA } from "@/features/menu/config/data.ts";
import MenuCategory from "@/features/menu/ui/menu-category.tsx";
import { useParams } from "react-router";
import cn from "clsx";

const Menu = () => {
  const params = useParams();

  return (
    <nav
      className={cn(styles.menu, params.subcategory && styles["menu-active"])}
    >
      <ul>
        {MENU_DATA.map((category) => (
          <MenuCategory key={category.id} {...category} />
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
