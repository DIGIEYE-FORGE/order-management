import { db } from "@/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(db),
    providers: [
      CredentialsProvider({
        name: "credentials",
        credentials: {
          email: { label: "email", type: "text" },
          password: { label: "password", type: "password" },
        },
        async authorize(credentials) {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Invalid credentials");
          }
  
          const user = await db.user.findUnique({
            where: {
              email: credentials.email,
            },
          });
  
          if (!user || !user?.password) {
            throw new Error("Invalid credentials");
          }
  
          const isCorrectPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );
  
          if (!isCorrectPassword) {
            throw new Error("Invalid credentials");
          }
  
          return user;
        },
      }),
    ],
    // pages: {
    //     signIn: '/',
    // },
    secret: "secret",
    session: {
      strategy: "jwt",
    },
  };