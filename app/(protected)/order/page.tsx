import { db } from "@/db";
import React from "react";
import { OrdersTable } from "../_components/order-table";
import AddOrder from "../_components/add-order";
import getCurrentUser from "@/actions/get-current-user";

export default async function OrderPage() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const orders = await db.order.findMany({
    include: {
      product: true,
      user: true,
    },
    where: { userId: user.id },
  });
  const products = await db.product.findMany({
    select: { name: true, id: true },
  });
  return (
    <div className="p-6 flex flex-col gap-4">
      <div className="flex justify-end">
        <AddOrder products={products} />
      </div>
      <OrdersTable isAdmin={user.role === "ADMIN"} orders={orders} />
    </div>
  );
}
