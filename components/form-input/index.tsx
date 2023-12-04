"use client";
import React from "react";
import { Input, InputProps } from "../ui/input";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import FormErrors from "../from-errors";
import { useFormStatus } from "react-dom";

interface FormInputProps extends InputProps {
  errors?: string[];
  label?: string;
}
export default function FromInput({
  errors,
  label,
  className,
  disabled,
  ...props
}: FormInputProps) {
  const { pending } = useFormStatus();
  return (
    <div
      className={cn(
        "from-input label text-neutral-600 [&>.label]:text-sm space-y-2",
        className
      )}
    >
      {label && <Label className="label">{label}</Label>}
      <Input disabled={disabled || pending} className="input" {...props} />
      <FormErrors errors={errors} />
    </div>
  );
}
