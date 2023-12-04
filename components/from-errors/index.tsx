import React from "react";

export interface FormErrorsProps {
  errors?: string[];
}

export default function FormErrors({ errors }: FormErrorsProps) {
  if (!errors) return null;
  return (
    <div className="form-errors flex flex-col p-2 rounded border border-red-500 text-red-500">
      {errors.map((error, index) => (
        <span key={index} className="text-sm">
          - {error}
        </span>
      ))}
    </div>
  );
}
