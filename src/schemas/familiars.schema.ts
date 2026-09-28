import { z } from "zod";

export const familiarAlignments = ["good", "evil", "neutral"] as const;

export const familiarSchema = z.strictObject({
  name: z.string().min(1),
  id: z.string().min(1).regex(/^[a-z][a-z0-9_]*$/),
  description: z.string().min(1),
  location: z.string().min(1),
  alignment: z.enum(familiarAlignments),
});

export const familiarsSchema = z.array(familiarSchema);
