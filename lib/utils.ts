import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function stringify(item: unknown, defaultValue = "") {
  if (!item) return defaultValue;
  if (typeof item === "string") return item;
  if (typeof item === "object") return JSON.stringify(item);
  else return String(item);
}
