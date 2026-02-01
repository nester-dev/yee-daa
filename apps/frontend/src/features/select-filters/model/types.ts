export type InitialState = {
  meat: string[];
  garnish: string[];
  allergens: OptionType[];
  isAllergensExcluded: boolean;
  isFiltersApplied: boolean;
};

export enum FILTERS_TYPES {
  MEAT = "MEAT",
  GARNISH = "GARNISH",
}

export type OptionType = {
  value: number;
  label: string;
};
