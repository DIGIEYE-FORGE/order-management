"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React, { ElementRef, useRef } from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { createOrderSchema } from "@/actions/create-order/schema";
import { createOrder } from "@/actions/create-order";

export default function AddOrder({
  products,
}: {
  products: { name: string; id: string }[];
}) {
  const closeRef = useRef<ElementRef<"button">>(null);
  const submit = async (formData: FormData) => {
    try {
      const productId = formData.get("productId");
      const amount = formData.get("amount");
      const data = {
        productId: productId as string,
        amount: parseInt(amount as string),
      };
      const order = await createOrderSchema.parseAsync(data);
      // console.log(order);
      await createOrder(order);
      toast.success("Product created");
      closeRef.current?.click();
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong");
    }
  };
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Add Order</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Order</DialogTitle>
          </DialogHeader>
          <form action={submit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Product
                </Label>
                <Select name="productId">
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a Product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.id + ""}>
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Amount
                </Label>
                <Input
                  id="amount"
                  type="number"
                  name="amount"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter className="col-span-full">
              <Button type="submit">Save </Button>
            </DialogFooter>
          </form>
          <DialogClose asChild>
            <button ref={closeRef} hidden></button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
}
