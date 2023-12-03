import { getServerSession } from "next-auth/next";
import { db } from "@/db";
import { authOptions } from "@/app/api/auth/[...nextAuth]/route";

export const getSession = async () => {
  return await getServerSession(authOptions);
};

const getCurrentUser = async () => {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }
    // exclude hashedPassword
    const currentUser = await db.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      return null;
    }

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toDateString() || null,
    };
  } catch (error: any) {
    return null;
  }
};

export default getCurrentUser;
