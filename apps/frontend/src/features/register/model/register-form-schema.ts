import { z } from "zod";

import {
  isCyrillicWithHyphen,
  isLatinWithSpecialChars,
  isPasswordValid,
  startsWithCyrillicUppercase,
} from "@/shared/lib/validators.ts";

export const PersonalInfoSchema = z.object({
  firstName: z
    .string()
    .nonempty("Введите имя")
    .min(2, "Минимум 2 символа")
    .max(50, "Максимальная длина 50 символов")
    .refine(startsWithCyrillicUppercase, {
      error: "Должно начинаться с кириллицы А-Я",
    })
    .refine(isCyrillicWithHyphen, {
      error: 'Только кириллица А-Я, и "-"',
    }),
  lastName: z
    .string()
    .nonempty("Введите фамилию")
    .min(2, "Минимум 2 символа")
    .max(50, "Максимальная длина 50 символов")
    .refine(startsWithCyrillicUppercase, {
      error: "Должно начинаться с кириллицы А-Я",
    })
    .refine(isCyrillicWithHyphen, {
      error: 'Только кириллица А-Я, и "-"',
    }),
  email: z
    .email("Введите корректный e-mail")
    .nonempty("Введите e-mail")
    .max(50, "Максимальная длина 50 символов"),
});

export const CredentialsSchema = z
  .object({
    login: z
      .string()
      .nonempty("Введите логин")
      .min(5, "Не соответствует формату")
      .max(50, "Максимальная длина 50 символов")
      .refine(isLatinWithSpecialChars, { error: "Не соответствует формату" }),
    password: z
      .string()
      .nonempty("Введите пароль")
      .min(8, "Минимум 8 символов")
      .max(50, "Максимальная длина 50 символов")
      .refine(isPasswordValid, { error: "Не соответствует формату" }),
    confirmPassword: z
      .string()
      .nonempty("Повторите пароль")
      .min(8, "Не соответствует формату"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Пароли должны совпадать",
    path: ["confirmPassword"],
  });

export const RegisterFormSchema = z.object({
  ...PersonalInfoSchema.shape,
  ...CredentialsSchema.shape,
});

export type RegisterFormType = z.infer<typeof RegisterFormSchema>;
