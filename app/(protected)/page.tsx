import { db } from "@/db";
import React from "react";
import { ProductsTable } from "./_components/product-table";
import AddProduct from "./_components/add-product";
import getCurrentUser from "@/actions/get-current-user";
import { Barcode } from "lucide-react";

export default async function Home() {
  const products = await db.product.findMany();
  const user = await getCurrentUser();

  return (
    <div className="p-6 flex flex-col gap-4">
      <div className="flex justify-end">
        <span className="font-semibold mr-auto flex items-center gap-2">
          <Barcode size={16} />
          Products
        </span>
        <AddProduct />
      </div>
      <ProductsTable products={products} />
    </div>
  );
}
