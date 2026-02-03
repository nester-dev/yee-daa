import { type FC, useRef } from "react";
import { NavLink, useParams } from "react-router";
import cn from "clsx";

import type { SubCategory } from "@/entities/category";

import { UiTypography } from "@/shared/ui/ui-typography";

import styles from "./menu.module.scss";

type Props = {
  subCategories: SubCategory[];
  parentCategory: string;
  isParentActive: boolean;
};

const MenuSubcategory: FC<Props> = ({
  parentCategory,
  subCategories = [],
  isParentActive,
}) => {
  const params = useParams();
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
        const isSubcategoryActive = params.subcategory === subcategory.category;
        return (
          <NavLink
            key={subcategory._id}
            to={`${parentCategory}/${subcategory.category}`}
            className={cn(
              styles.link,
              isSubcategoryActive && styles["link-active"],
            )}
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
