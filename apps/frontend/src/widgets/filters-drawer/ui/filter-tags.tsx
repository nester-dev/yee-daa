import type { FC } from "react";
import { motion } from "framer-motion";

import {
  deleteFilter,
  selectGarnishFilter,
  selectMeatFilter,
} from "@/features/select-filters";

import { useAppDispatch, useAppSelector } from "@/shared/lib/redux.ts";
import UiTag from "@/shared/ui/ui-tag/ui-tag.tsx";

import styles from "./filters-drawer.module.scss";

const FilterTags: FC = () => {
  const meatFilters = useAppSelector(selectMeatFilter);
  const garnishFilters = useAppSelector(selectGarnishFilter);
  const dispatch = useAppDispatch();
  const tags = [...meatFilters, ...garnishFilters];

  if (!tags.length) {
    return null;
  }

  const handleDeleteFilter = (filter: string) => {
    dispatch(deleteFilter(filter));
  };

  return (
    <div className={styles.tags}>
      {tags.map((tag) => (
        <motion.div layout key={tag}>
          <UiTag
            key={tag}
            color="greenLight"
            closable={true}
            onClose={() => handleDeleteFilter(tag)}
          >
            {tag}
          </UiTag>
        </motion.div>
      ))}
    </div>
  );
};

export default FilterTags;
