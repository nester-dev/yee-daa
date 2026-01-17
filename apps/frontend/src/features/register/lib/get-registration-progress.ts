import { z } from "zod";

import type { RegisterFormType } from "../model/register-form-schema";

const TOTAL_REGISTRATION_FIELDS = 6;
const PERCENT_PER_FIELD = 100 / TOTAL_REGISTRATION_FIELDS;

export const getRegistrationProgress = (
  data: RegisterFormType,
  errors?: z.ZodFlattenedError<RegisterFormType>["fieldErrors"],
) => {
  if (!data) {
    return 0;
  }
  return Object.entries(data).reduce((acc, [key, value]) => {
    const typedKey = key as keyof RegisterFormType;

    const hasValue = Boolean(value && value.trim());
    const hasErrors = !!errors?.[typedKey]?.length;

    if (hasValue && !hasErrors) {
      return acc + PERCENT_PER_FIELD;
    }

    return Math.min(acc, 100);
  }, 0);
};
