import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import { db } from '@/db';

export const POST = async (
    req: Request
) => {
    const body = await req.json();
    const { email, password } = body;

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await db.user.create({
        data: {
            email,
            password: hashedPassword,
        },
    });
    return NextResponse.json(user);
};