import { z } from "zod";

export const OptionSchema = z.object({
  value: z.string().min(1),
  label: z.string().min(1),
});

export const StepSchema = z.object({
  image: z.string(),
  description: z.string().min(1).max(250),
});

export const IngredientSchema = z.object({
  title: z.string().min(1).max(50),
  count: z.string().min(1).max(20),
  measureUnit: z.object(OptionSchema.shape),
});

export const PublishRecipeSchema = z.object({
  title: z.string().nonempty().min(3).max(50),
  description: z.string().nonempty().min(3).max(500),
  categories: z.array(OptionSchema).min(3),
  time: z.number().positive().int().max(10000),
  portions: z.number().positive().int(),
  steps: z.array(StepSchema).min(1),
  ingredients: z.array(IngredientSchema).min(1),
});

export const DraftRecipeSchema = z
  .object({
    title: z.string().nonempty().min(3).max(50),
  })
  .loose();

export type PublishRecipeSchemaType = z.infer<typeof PublishRecipeSchema>;
export type DraftRecipeSchemaType = z.infer<typeof DraftRecipeSchema>;
