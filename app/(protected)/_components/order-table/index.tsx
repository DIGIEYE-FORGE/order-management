"use client";
import { updateOrderStatus } from "@/actions/update-order-status";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Order, Product, User } from "@prisma/client";
import { toast } from "sonner";
import { X, Check, Loader } from "lucide-react";
import { cn } from "@/lib/utils";

export type OrderWithProduct = Order & {
  product: Product;
  user: User;
};

export function OrdersTable({
  orders,
  isAdmin,
}: {
  orders: OrderWithProduct[];
  isAdmin: boolean;
}) {
  const updateOrder = async (orderId: string, status: string) => {
    try {
      updateOrderStatus({ orderId, status });
      toast.success(`Order status updated to ${status}!`);
    } catch (e) {
      toast.error("Something went wrong");
    }
  };

  const Icon = ({
    status,
    className,
  }: {
    status: string;
    className?: string;
  }) => {
    if (status === "accepted")
      return <Check className={cn("text-green-500", className)} />;
    if (status === "rejected")
      return <X className={cn("text-red-500", className)} />;
    if (status === "pending")
      return <Loader className={cn("text-gray-500", className)} />;
  };
  return (
    <Card>
      <Table className="table-fixed">
        <TableHeader className="capitalize">
          <TableRow>
            <TableHead>product</TableHead>
            <TableHead>email</TableHead>
            <TableHead>amount</TableHead>
            <TableHead className="px-6">status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((orders) => (
            <TableRow key={orders.id}>
              <TableCell>{orders.product.name}</TableCell>
              <TableCell>{orders?.user?.email || "--"}</TableCell>
              <TableCell>{orders.amount}</TableCell>
              <TableCell>
                {isAdmin ? (
                  <Select
                    onValueChange={(value) => {
                      updateOrder(orders.id, value);
                    }}
                    value={orders.status}
                    name="status"
                  >
                    <SelectTrigger className="">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={"pending"}>pending</SelectItem>
                      <SelectItem value={"accepted"}>accepted</SelectItem>
                      <SelectItem value={"rejected"}>rejected</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <span className="px-4 flex gap-2 items-center">
                    <Icon
                      status={orders.status}
                      className="w-5 aspect-square"
                    />
                    <span className="capitalize">{orders.status}</span>
                  </span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell className="text-left">Total: {orders.length}</TableCell>
            <TableCell colSpan={3}></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </Card>
  );
}
