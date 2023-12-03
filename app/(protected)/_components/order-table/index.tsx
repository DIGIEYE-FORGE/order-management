"use client";
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
import { Order, Product, User } from "@prisma/client";

export type OrderWithProduct = Order & {
  product: Product;
  user: User;
};

export function OrdersTable({ orders }: { orders: OrderWithProduct[] }) {
  return (
    <Table>
      <TableCaption>A list of your recent products.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>product</TableHead>
          <TableHead>user</TableHead>
          <TableHead>amount</TableHead>
          <TableHead>status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((orders) => (
          <TableRow key={orders.id}>
            <TableCell>{orders.product.name}</TableCell>
            <TableCell>{orders.user.name}</TableCell>
            <TableCell>{orders.amount}</TableCell>
            <TableCell>{orders.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={orders.length - 1}></TableCell>
          <TableCell className="text-right">Total: {orders.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
