import { z } from "zod";

export const OptionSchema = z.object({
  value: z.string().min(1),
  label: z.string().min(1),
});

export const OptionDraftSchema = z.object({
  value: z.string(),
  label: z.string(),
});

export const StepSchema = z.object({
  image: z.string(),
  description: z.string().min(1).max(250),
});

export const StepDraftSchema = z.object({
  image: z.string(),
  description: z.string().max(250),
});

export const IngredientSchema = z.object({
  title: z.string().max(50).nonempty(),
  count: z.string().max(20).nonempty(),
  measureUnit: z.object(OptionSchema.shape),
});

const IngredientDraftSchema = z.object({
  title: z.string().max(50),
  count: z.string().max(20),
  measureUnit: z.object(OptionDraftSchema.shape),
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

export const DraftRecipeSchema = z.object({
  title: z.string().nonempty().max(50),
  description: z.string().max(500).optional(),
  categories: z.array(OptionDraftSchema),
  time: z.number().positive().int().max(10000).optional(),
  portions: z.number().positive().int().optional(),
  ingredients: z.array(IngredientDraftSchema),
  steps: z.array(StepDraftSchema),
});

export type PublishRecipeSchemaType = z.infer<typeof PublishRecipeSchema>;
export type DraftRecipeSchemaType = z.infer<typeof DraftRecipeSchema>;
