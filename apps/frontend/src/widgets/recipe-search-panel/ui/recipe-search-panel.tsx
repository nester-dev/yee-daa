import { type FC, useState } from "react";

import FiltersIcon from "@/shared/assets/icons/align-icon.svg?react";
import SearchIcon from "@/shared/assets/icons/search-icon.svg?react";
import UiIconButton from "@/shared/ui/ui-icon-button/ui-icon-button.tsx";
import UiInput from "@/shared/ui/ui-input/ui-input.tsx";
import UiToggle from "@/shared/ui/ui-toggle/ui-toggle.tsx";
import { UiTypography } from "@/shared/ui/ui-typography";

import styles from "./recipe-search-panel.module.scss";

type Props = {
  heading: string;
  description?: string;
};

const RecipeSearchPanel: FC<Props> = ({ heading, description }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [toggled, setToggled] = useState(false);

  return (
    <div className={styles.panel}>
      <UiTypography variant="title" fontWeight="bold">
        {heading}
      </UiTypography>
      {description && (
        <UiTypography
          color="blackOverlay"
          fontWeight="medium"
          align="center"
          className={styles.description}
        >
          {description}
        </UiTypography>
      )}

      <div className={styles.search}>
        <UiIconButton variant="outline" size="sm">
          <FiltersIcon />
        </UiIconButton>
        <UiInput
          name="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Название или ингредиент..."
          className={styles.input}
          suffix={
            <UiIconButton>
              <SearchIcon />
            </UiIconButton>
          }
        />
      </div>
      <div className={styles.filters}>
        <div className={styles.allergens}>
          <UiTypography fontWeight="medium">Исключить аллергены</UiTypography>
          <UiToggle toggled={toggled} onToggle={() => setToggled(!toggled)} />
        </div>
      </div>
    </div>
  );
};

export default RecipeSearchPanel;
