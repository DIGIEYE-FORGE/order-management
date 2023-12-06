"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { signup } from "@/actions/signup";
import { TInput } from "@/actions/signup/schema";
import { toast } from "sonner";
import { FieldErrors } from "@/actions/utils";
import FormInput from "./form-input";
import { set } from "zod";

export function SignUp() {
  const [open, setOpen] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors<TInput>>({});

  const handleOpen = () => {
    if (open) {
      setFieldErrors({});
    }
    setOpen((prev) => !prev);
  };

  const handleSubmit = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const { result, error, fieldErrors } = await signup({
      name,
      email,
      password,
    });
    if (error) {
      toast.error(error);
    }
    if (fieldErrors) {
      toast.error("Please check your input");
      setFieldErrors(fieldErrors);
    }
    if (result) {
      toast.success("Signed Up");
      handleOpen();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Sign Up
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sign Up </DialogTitle>
        </DialogHeader>
        <form
          action={handleSubmit}
          className="flex flex-col gap-4 [&>form-input]:grid "
        >
          <FormInput label="name" name="name" errors={fieldErrors.name} />
          <FormInput label="email" name="email" errors={fieldErrors.email} />
          <FormInput
            label="password"
            name="password"
            errors={fieldErrors.password}
          />
          <Button type="submit" className="mt-4">
            SignUp
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
