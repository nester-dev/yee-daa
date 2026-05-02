const pr = new Intl.PluralRules("ru");

const forms: Record<Intl.LDMLPluralRule, string> = {
  zero: "новых рецептов",
  one: "новый рецепт",
  two: "новых рецепта",
  few: "новых рецепта",
  many: "новых рецептов",
  other: "новых рецептов",
};

export const getNewRecipesText = (count: number) => {
  return `${forms[pr.select(count)]}`;
};
