import { db } from "@/db";
import React from "react";
import { ProductsTable } from "./_components/product-table";
import AddProduct from "./_components/add-product";

export default async function Home() {
  const products = await db.product.findMany();
  return (
    <div className="p-6 flex flex-col gap-4">
      <div className="flex justify-end">
        <AddProduct />
      </div>
      <ProductsTable products={products} />
    </div>
  );
}
