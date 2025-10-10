import styles from "./Menu.module.scss";
import { MENU_DATA } from "@/features/menu/config/data.ts";
import MenuCategory from "@/features/menu/ui/menu-category.tsx";

const Menu = () => {
  return (
    <nav className={styles.menu}>
      <ul>
        {MENU_DATA.map((category) => (
          <MenuCategory key={category.id} {...category} />
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
