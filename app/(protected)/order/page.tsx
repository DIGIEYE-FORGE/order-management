import { db } from "@/db";
import React from "react";
import { OrdersTable } from "../_components/order-table";
import AddOrder from "../_components/add-order";

export default async function OrderPage() {
  const orders = await db.order.findMany({
    include: {
      product: true,
      user: true,
    },
    where: { userId: 1 },
  });
  const products = await db.product.findMany({
    select: { name: true, id: true },
  });
  return (
    <div className="p-6 flex flex-col gap-4">
      <div className="flex justify-end">
        <AddOrder products={products} />
      </div>
      <OrdersTable orders={orders} />
    </div>
  );
}
