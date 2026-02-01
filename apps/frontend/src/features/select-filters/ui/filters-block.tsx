import type { FC } from "react";

import UiCheckbox from "@/shared/ui/ui-checkbox/ui-checkbox.tsx";
import { UiTypography } from "@/shared/ui/ui-typography";

import styles from "./select-filters.module.scss";

type Props = {
  name: string;
  data: string[];
  selectedFilters: string[];
  onClick: (filter: string) => void;
};

const FiltersBlock: FC<Props> = ({ name, data, onClick, selectedFilters }) => {
  return (
    <div className={styles.block}>
      <UiTypography fontWeight="medium">{name}</UiTypography>
      <ul className={styles.list}>
        {data.map((filter) => (
          <li key={filter}>
            <label htmlFor={filter} className={styles.item}>
              <UiCheckbox
                id={filter}
                checked={selectedFilters.includes(filter)}
                onChange={() => onClick(filter)}
              />
              {filter}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FiltersBlock;
