import { z } from "zod";

export const validateForm = <T extends z.ZodTypeAny>(
  schema: T,
  formData: z.infer<T>,
) => {
  const result = schema.safeParse(formData);

  if (!result.success) {
    return z.flattenError(result.error).fieldErrors;
  }
  return undefined;
};
