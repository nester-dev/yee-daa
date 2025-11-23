import { z } from "zod";

export const LoginFormSchema = z.object({
  login: z
    .string()
    .nonempty("Введите логин")
    .max(50, "Максимальная длина 50 символов"),
  password: z
    .string()
    .nonempty("Введите пароль")
    .max(50, "Максимальная длина 50 символов"),
});

export type LoginFormType = z.infer<typeof LoginFormSchema>;
