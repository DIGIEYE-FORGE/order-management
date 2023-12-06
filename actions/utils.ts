import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { z } from "zod";

export type FieldErrors<T> = Partial<Record<keyof T, string[]>>;

export type Action<TInput, TOutput> = (data: TInput) => Promise<{
  result?: TOutput;
  fieldErrors?: FieldErrors<TInput>;
  error?: string;
}>;

export function createSafeAction<TInput, TOutput>(
  scheme: z.Schema<TInput>,
  handler: (data: TInput) => Promise<TOutput>
): Action<TInput, TOutput> {
  return async (data) => {
    try {
      const parsed = scheme.safeParse(data);
      if (!parsed.success) {
        return {
          fieldErrors: parsed.error.flatten()
            .fieldErrors as FieldErrors<TInput>,
        };
      }
      const result = await handler(parsed.data);
      return { result };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          const field = error.meta?.target as keyof TInput;
          return {
            fieldErrors: {
              [field]: [`This ${error.meta?.target} is already taken`],
            } as FieldErrors<TInput>,
          };
        }
      }
      return {
        error: "An unexpected error occurred. Please try again later.",
      };
    }
  };
}
