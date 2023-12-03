import { z } from "zod";

export const createOrderSchema = z.object({
  productId: z.number(),
  amount: z.number(),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
