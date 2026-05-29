import type { DraftRecipeType } from "@/entities/recipe";

export type User = {
  _id: string;
  email: string;
  login: string;
  firstName: string;
  lastName: string;
  photoLink: string;
  recipesIds: string[];
  drafts: DraftRecipeType[];
  subscriptions: string[];
  subscribers: string[];
};

export type UserAvatarSize = "medium" | "large";
