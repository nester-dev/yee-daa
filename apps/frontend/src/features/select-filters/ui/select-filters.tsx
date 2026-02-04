import type { FC } from "react";

import {
  selectGarnishFilter,
  selectMeatFilter,
} from "@/features/select-filters";

import { useAppDispatch, useAppSelector } from "@/shared/lib/redux.ts";

import { GARNISH_FILRTERS, MEAT_FILTERS } from "../config/data.ts";
import { setGarnishFilter, setMeatFilter } from "../model/slice.ts";
import { FILTERS_TYPES } from "../model/types.ts";
import FiltersBlock from "../ui/filters-block.tsx";

import styles from "./select-filters.module.scss";

const SelectFilters: FC = () => {
  const meatFilters = useAppSelector(selectMeatFilter);
  const garnishFilters = useAppSelector(selectGarnishFilter);
  const dispatch = useAppDispatch();

  const handleSelect = (type: FILTERS_TYPES) => (filter: string) => {
    if (!filter) {
      return;
    }

    if (type === FILTERS_TYPES.MEAT) {
      dispatch(setMeatFilter(filter));
      return;
    }

    dispatch(setGarnishFilter(filter));
  };

  return (
    <div className={styles.filters}>
      <FiltersBlock
        onClick={handleSelect(FILTERS_TYPES.MEAT)}
        name="Тип мяса:"
        data={MEAT_FILTERS}
        selectedFilters={meatFilters}
      />
      <FiltersBlock
        onClick={handleSelect(FILTERS_TYPES.GARNISH)}
        name="Тип гарнира:"
        data={GARNISH_FILRTERS}
        selectedFilters={garnishFilters}
      />
    </div>
  );
};

export default SelectFilters;
