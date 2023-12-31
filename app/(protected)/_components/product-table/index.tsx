"use client";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "@prisma/client";

export function ProductsTable({ products }: { products: Product[] }) {
  return (
    <Card>
      <Table>
        <TableCaption>A list of your recent products.</TableCaption>
        <TableHeader className="bg-gray-500/10">
          <TableRow className="capitalize">
            <TableHead>name</TableHead>
            <TableHead>price</TableHead>
            <TableHead>reference</TableHead>
            <TableHead>in stock</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.reference}</TableCell>
              <TableCell>{0}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell className="text-left">
              Total: {products.length}
            </TableCell>
            <TableCell colSpan={3}></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </Card>
  );
}
