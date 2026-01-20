import { z } from "zod";

export const PasswordForgotSchema = z.object({
  email: z
    .email("Введите корректный e-mail")
    .nonempty("Введите e-mail")
    .max(50, "Максимальная длина 50 символов"),
});

export type PasswordForgotType = z.infer<typeof PasswordForgotSchema>;
