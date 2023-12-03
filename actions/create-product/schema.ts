import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string(),
  reference: z.string(),
  description: z.string().optional(),
  price: z.number().optional(),
  //   image: z.string().optional(),
  //   attributes: z
  //     .record(z.union([z.string(), z.number(), z.boolean()]))
  //     .optional(),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
