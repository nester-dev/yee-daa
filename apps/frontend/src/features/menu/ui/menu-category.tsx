import type { FC, MouseEvent } from "react";
import type { Category } from "@/entities/category";
import { UiTypography } from "@/shared/ui/ui-typography";
import MenuSubcategory from "./menu-subcategory.tsx";
import ExpandArrow from "@/shared/assets/icons/expand-arrow.svg?react";
import { NavLink, useParams } from "react-router";
import cn from "clsx";
import styles from "./Menu.module.scss";

const MenuCategory: FC<Category> = ({
  icon,
  title,
  category,
  subCategories,
}) => {
  const params = useParams();
  const isCategoryActive = params?.category === category;
  const [firstSubcategory] = subCategories;
  const url = `${category}/${firstSubcategory.category}`;

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (isCategoryActive) {
      e.preventDefault();
    }
  };

  return (
    <li>
      <NavLink
        className={cn(
          styles["menu-category"],
          isCategoryActive && styles.active,
        )}
        to={url}
        onClick={handleClick}
      >
        <img
          className={styles["menu-icon"]}
          src={`${import.meta.env.VITE_API_URL}${icon}`}
          alt={category}
        />
        <UiTypography
          variant="text"
          fontWeight="medium"
          className={styles.text}
        >
          {title}
        </UiTypography>
        <ExpandArrow />
      </NavLink>

      <MenuSubcategory
        subCategories={subCategories}
        parentCategory={category}
        isParentActive={isCategoryActive}
      />
    </li>
  );
};

export default MenuCategory;
