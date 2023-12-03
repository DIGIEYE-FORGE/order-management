"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function Login() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    signIn("credentials", {
      ...data,
      redirect: false,
    })
      .then((res) => {
        if (res?.ok) {
          router.refresh();
          setOpen(false);
        }
        if (res?.error) {
          toast.error(res?.error || "Something went wrong");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleOpen = (open: boolean) => {
    setOpen(open);
  };
  return (
    <Dialog onOpenChange={handleOpen} open={open}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Sign In
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sign In </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              email
            </Label>
            <Input
              id="email"
              className="col-span-3"
              onChange={(e) => {
                setData({ ...data, email: e.target.value });
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              password
            </Label>
            <Input
              id="password"
              type="password"
              className="col-span-3"
              onChange={(e) => {
                setData({ ...data, password: e.target.value });
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            SignIn
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
