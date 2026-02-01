import type { FC } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Variants } from "motion";

import { ExcludeAllergens, SelectAllergens } from "@/features/select-allergens";
import { SelectFilters } from "@/features/select-filters";

import CrossIcon from "@/shared/assets/icons/cross-filled-icon.svg?react";
import UiBackdrop from "@/shared/ui/ui-backdrop/ui-backdrop.tsx";
import UiIconButton from "@/shared/ui/ui-icon-button/ui-icon-button.tsx";
import UiCheckboxOption from "@/shared/ui/ui-select/ui-checkbox-option.tsx";
import UiSelect from "@/shared/ui/ui-select/ui-select.tsx";
import { UiTypography } from "@/shared/ui/ui-typography";

import { getCategoryOptions } from "../lib/get-category-options.ts";

import ActionButtons from "./action-buttons.tsx";
import FilterTags from "./filter-tags.tsx";

import styles from "./filters-drawer.module.scss";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const drawerVariants: Variants = {
  visible: {
    x: 0,
    transition: {
      ease: "easeOut",
    },
  },
  hidden: {
    x: "100%",
    transition: {
      ease: "easeOut",
    },
  },
};

const FiltersDrawer: FC<Props> = ({ onClose, isOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <UiBackdrop onClick={onClose}>
          <motion.div
            className={styles.drawer}
            variants={drawerVariants}
            animate="visible"
            initial="hidden"
            exit="hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.container}>
              <div className={styles.content}>
                <div className={styles.heading}>
                  <UiTypography variant="xxl" fontWeight="bold">
                    Фильтр
                  </UiTypography>
                  <UiIconButton size="xs" onClick={onClose}>
                    <CrossIcon />
                  </UiIconButton>
                </div>
                <UiSelect
                  placeholder="Категория"
                  isMulti={true}
                  options={getCategoryOptions()}
                  closeMenuOnSelect={false}
                  hideSelectedOptions={false}
                  components={{
                    Option: UiCheckboxOption,
                  }}
                />

                <UiSelect
                  placeholder="Поиск по автору"
                  isMulti
                  closeMenuOnSelect={false}
                  components={{ Option: UiCheckboxOption }}
                />
                <div className={styles.allergens}>
                  <ExcludeAllergens />
                  <SelectAllergens />
                </div>
                <SelectFilters />
                <FilterTags />
                <ActionButtons />
              </div>
            </div>
          </motion.div>
        </UiBackdrop>
      )}
    </AnimatePresence>
  );
};

export default FiltersDrawer;
