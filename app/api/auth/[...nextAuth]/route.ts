import NextAuth from "next-auth";
import type { AuthOptions } from "next-auth";
import { PrismaClient, User } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { db } from "@/db";


export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(db),
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid credentials");
                }

                const user= await db.user.findUnique({
                    where: {
                        email: credentials.email,
                    }
                })

                if (!user || !user?.password) {
                    throw new Error("Invalid credentials");
                }

                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.password
                )

                if (!isCorrectPassword) {
                    throw new Error("Invalid credentials");
                }

                return user;
            }
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

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };