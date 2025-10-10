import { type FC, useRef } from "react";
import type { SubCategory } from "@/entities/category";
import { NavLink } from "react-router";
import { UiTypography } from "@/shared/ui/ui-typography";
import cn from "clsx";
import styles from "./menu.module.scss";

type Props = {
  subCategories: SubCategory[];
  parentCategory: string;
  isParentActive: boolean;
};

const MenuSubcategory: FC<Props> = ({
  parentCategory,
  subCategories,
  isParentActive,
}) => {
  const subcategoryRef = useRef<HTMLUListElement>(null);
  const height = isParentActive
    ? `${subcategoryRef.current?.scrollHeight}px`
    : 0;

  return (
    <ul
      ref={subcategoryRef}
      className={styles.list}
      style={{
        height,
      }}
    >
      {subCategories.map((subcategory) => {
        return (
          <NavLink
            key={subcategory.id}
            to={`${parentCategory}/${subcategory.category}`}
            className={({ isActive }) =>
              cn(styles.link, isActive && styles["link-active"])
            }
            end
          >
            <li className={styles.subcategory}>
              <UiTypography variant="text" fontWeight="medium">
                {subcategory.title}
              </UiTypography>
            </li>
          </NavLink>
        );
      })}
    </ul>
  );
};

export default MenuSubcategory;
