"use server";

import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { CreateProductInput } from "./schema";

export const createProduct = async (data: CreateProductInput) => {
  const product = await db.product.create({
    data,
  });
  revalidatePath("/");

  return product;
};
