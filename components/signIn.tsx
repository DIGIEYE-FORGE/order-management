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
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    signIn("credentials", {
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      redirect: false,
    })
      .then((res) => {
        if (res?.ok) {
          router.refresh();
          console.log(res.error);
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
    console.log(open);
    setOpen(open);
  };
  return (
    <Dialog onOpenChange={handleOpen} open={open}>
      <DialogTrigger asChild>
        <Button variant="outline" className="ml-auto" size="sm">
          Sign IN
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
            <Input id="email" className="col-span-3" ref={emailRef} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              password
            </Label>
            <Input id="password" className="col-span-3" ref={passwordRef} />
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
