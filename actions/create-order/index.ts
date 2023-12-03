"use server";

import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { CreateOrderInput } from "./schema";
import { getSession } from "next-auth/react";
import getCurrentUser from "../get-current-user";

export const createOrder = async (data: CreateOrderInput) => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("You must be signed in to create an order");
  }
  const product = await db.order.create({
    data: {
      amount: data.amount,
      productId: data.productId,
      userId: user.id,
    },
  });
  revalidatePath("/order");

  return product;
};
