export type OptionType = {
  value: number;
  label: string;
};

export type InitialState = {
  allergens: OptionType[];
  isAllergensExcluded: boolean;
};
