import { type ChangeEvent, useCallback } from "react";

import { type OptionType } from "@/features/select-filters";

import { useAppDispatch, useAppSelector } from "@/shared/lib/redux.ts";

import {
  selectRecipeCategories,
  selectRecipeDescription,
  selectRecipePortions,
  selectRecipeTime,
  selectRecipeTitle,
} from "../model/selectors.ts";
import {
  decrementPortion,
  decrementTime,
  incrementPortion,
  incrementTime,
  setRecipeCategories,
  setRecipeDescription,
  setRecipeTitle,
} from "../model/slice.ts";

export const useRecipeMeta = () => {
  const title = useAppSelector(selectRecipeTitle);
  const description = useAppSelector(selectRecipeDescription);
  const portions = useAppSelector(selectRecipePortions);
  const time = useAppSelector(selectRecipeTime);
  const categoriesOptions = useAppSelector(selectRecipeCategories);
  const dispatch = useAppDispatch();

  const handleTitleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(setRecipeTitle(e.target.value));
    },
    [dispatch],
  );

  const handleDescriptionChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      dispatch(setRecipeDescription(e.target.value));
    },
    [dispatch],
  );

  const handleIncrement = useCallback(() => {
    dispatch(incrementPortion());
  }, [dispatch]);

  const handleDecrement = useCallback(() => {
    dispatch(decrementPortion());
  }, [dispatch]);

  const handleIncrementTime = useCallback(() => {
    dispatch(incrementTime());
  }, [dispatch]);

  const handleDecrementTime = useCallback(() => {
    dispatch(decrementTime());
  }, [dispatch]);

  const handleChangeCategories = useCallback(
    (newValue: unknown) => {
      dispatch(setRecipeCategories(newValue as OptionType[]));
    },
    [dispatch],
  );

  return {
    title,
    description,
    portions,
    time,
    categoriesOptions,
    handleTitleChange,
    handleDescriptionChange,
    handleIncrement,
    handleDecrement,
    handleIncrementTime,
    handleDecrementTime,
    handleChangeCategories,
  };
};
