"use server";

import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { CreateOrderInput } from "./schema";

export const createOrder = async (data: CreateOrderInput) => {
  const product = await db.order.create({
    data: {
      ...data,
      userId: 1,
    },
  });
  revalidatePath("/order");

  return product;
};
