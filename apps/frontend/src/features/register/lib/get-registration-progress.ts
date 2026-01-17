import type { RegisterFormType } from "@/features/register/model/register-form-schema.ts";

const TOTAL_REGISTRATION_FIELDS = 6;
const PERCENT_PER_FIELD = 100 / TOTAL_REGISTRATION_FIELDS;

type FieldErrors<T> = Partial<Record<keyof T, string[] | undefined>>;

export const getRegistrationProgress = (
  data: RegisterFormType,
  errors?: FieldErrors<RegisterFormType>,
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
