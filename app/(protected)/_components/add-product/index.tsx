"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React, { ElementRef, useRef } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createProduct } from "@/actions/create-product";
import { toast } from "sonner";
import { z } from "zod";
import { createProductSchema } from "@/actions/create-product/schema";

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function AddProduct() {
  const closeRef = useRef<ElementRef<"button">>(null);
  const submit = async (formData: FormData) => {
    try {
      const name = formData.get("name");
      const reference = formData.get("reference");
      const description = formData.get("description");
      const price = formData.get("price");
      const data = {
        name,
        reference,
        description,
        price: Number(price),
      };

      const product = await createProductSchema.parseAsync(data);
      await createProduct(product);
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
          <Button className="flex items-center">
            <Plus className="h-4 aspect-square" />
            <span>Add Product</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Product</DialogTitle>
          </DialogHeader>
          <form action={submit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" name="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="reference" className="text-right">
                  Reference
                </Label>
                <Input id="reference" name="reference" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  name="description"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price
                </Label>
                <Input
                  id="price"
                  type="number"
                  name="price"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter className="col-span-full">
              <Button type="submit">Save changes</Button>
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
