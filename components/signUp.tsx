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
import { useRef,useState } from "react";
import axios from "axios";

export function SignUp() {
  const[open, setOpen] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    axios.post("/api/signup", {
      // name: nameRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    }).then((res) => {
      console.log(res);
      setOpen(false);
    }).catch((err) => {
      console.log(err);
    })
  };
  const handleOpen = (open: boolean) => {
    console.log(open);
    setOpen(open);
  }
  return (
    <Dialog onOpenChange={handleOpen} open={open}>
      <DialogTrigger asChild>
        <Button variant="outline" className="ml-auto" size="sm">
          Sign Up
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sign Up </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              name
            </Label>
            <Input id="name" ref={nameRef} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              email
            </Label>
            <Input id="email"  className="col-span-3" ref={emailRef} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              password
            </Label>
            <Input id="password" type="text" className="col-span-3" ref={passwordRef} />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>SignUp</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
