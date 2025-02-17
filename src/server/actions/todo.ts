"use server";
import { revalidatePath } from 'next/cache';
import prisma from '../db/prisma';
import { Task } from '@prisma/client';

export const getTasks = async (userId: string) => {
    return prisma.task.findMany({
        where: {
            ownerId: userId,
        }
    });
};

export const createTask = async ({ task }: {
    task: {
        title: string;
        description: string;
        ownerId: string;
        dueDate: Date;
    }
}) => {
    const response = await prisma.task.create({
        data: task,
    });
    revalidatePath('/');
    return response;
};

export const updateTask = async (id: number, task: {
    title: Task['title'];
    description: Task['description'];
    dueDate: Task['dueDate'];
}) => {
    const response = await prisma.task.update({
        where: {
            id,
        },
        data: task,
    });
    revalidatePath('/');
    return response;
};

export const toggleTask = async (id: number) => {
    const task = await prisma.task.findUnique({
        where: {
            id,
        },
    });
    if (!task) throw new Error('Task not found');
    const response = await prisma.task.update({
        where: {
            id,
        },
        data: {
            completed: !task.completed,
        },
    });
    revalidatePath('/');
    return response;
};

export const deleteTask = async (id: number) => {
    const response = await prisma.task.delete({
        where: {
            id,
        },
    });
    revalidatePath('/');
    return response;
};

export const getTaskById = async (id: number) => {
    return prisma.task.findUnique({
        where: {
            id,
        },
    });
};
