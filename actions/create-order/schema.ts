import { z } from "zod";

export const createOrderSchema = z.object({
  productId: z.string(),
  amount: z.number(),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
