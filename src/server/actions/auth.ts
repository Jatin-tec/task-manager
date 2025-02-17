"use server";
import { cookies } from 'next/headers';
import prisma from '../db/prisma';
import { User } from '@prisma/client';
import passwordHash from 'password-hash';
import { encrypt, decrypt } from '@/utils/auth';
import { redirect } from 'next/navigation';

export const createAccount = async (user: User) => {
    await prisma.user.create({
        data: {
            ...user,
            password: passwordHash.generate(user.password),
        },
    });
    const cookieStore = await cookies();
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 365);
    const session = await encrypt({ id: user.id });
    cookieStore.set({
        name: "session",
        value: session,
        httpOnly: true,
        expires,
    });
    return user;
};

export const getSession = async () => {
    const cookieStore = await cookies();
    const session = cookieStore.get("session");
    if (!session) return null;
    return await decrypt(session.value);
}


export const login = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (!user) {
        throw new Error('No user found');
    }

    const valid = await passwordHash.verify(password, user.password);

    if (!valid) {
        throw new Error('Invalid password');
    }

    const cookieStore = await cookies();
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 365);
    const session = await encrypt({ id: user.id });
    cookieStore.set({
        name: "session",
        value: session,
        httpOnly: true,
        expires
    });
    return user;
};

export const logout = async () => {
    const cookieStore = await cookies();
    cookieStore.set({
        name: "session",
        value: "",
        expires: 0,
    });
    redirect("/login");
};