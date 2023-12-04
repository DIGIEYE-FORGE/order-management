"use server";

import { db } from "@/db";
import { TInput, inputSchema } from "./schema";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { z } from "zod";
import { Action, FieldErrors, createSafeAction } from "../utils";

const handler = async (data: TInput) => {
  const password = await bcrypt.hash(data.password, 12);
  const user = await db.user.create({
    data: {
      ...data,
      password,
    },
  });
  return user;
};

export const signup = createSafeAction(inputSchema, handler);
