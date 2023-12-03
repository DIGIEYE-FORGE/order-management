"use server";

import { db } from "@/db";
import { revalidatePath } from "next/cache";

export const updateOrderStatus = async ({
  orderId,
  status,
}: {
  orderId: string;
  status: string;
}) => {
  const product = await db.order.update({
    where: { id: orderId },
    data: { status },
  });
  revalidatePath("/order");

  return product;
};
