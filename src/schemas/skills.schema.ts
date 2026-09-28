import { z } from "zod";

export const skillCategories = [
  "combat",
  "gathering",
  "crafting",
  "utility",
] as const;

export const skillSchema = z.strictObject({
  name: z.string().min(1),
  id: z.string().min(1).regex(/^skill_[a-z][a-z0-9_]*$/),
  description: z.string().min(1),
  category: z.enum(skillCategories),
  sort_order: z.number().int(),
});

export const skillsSchema = z.array(skillSchema);
