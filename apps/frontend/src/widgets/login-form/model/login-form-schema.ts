import { z } from "zod";

export const LoginFormSchema = z.object({
  login: z.string().min(5),
  password: z.string().min(5),
});

export type LoginFormType = z.infer<typeof LoginFormSchema>;
