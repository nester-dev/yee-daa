import type { ChangeEvent } from "react";
import { z } from "zod";

export enum RegisterFormSteps {
  PERSONAL_INFO = "personal-info",
  CREDENTIALS = "credentials",
}

export type FormFieldProps<T> = {
  errors?: z.ZodFlattenedError<T>["fieldErrors"];
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};
