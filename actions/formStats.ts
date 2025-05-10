"use server"
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const getFormStats = async (formId:number) => {
    const user = await currentUser();

    if(!user || !user.id){
        console.log("User not found");
        return 0;
    }

    const stats = await prisma.form.aggregate({
        where: {
            id:formId,
            ownerId: user.id as string
        },
        _sum: {
            submissions: true
        }
    });

    const submissions = stats._sum.submissions || 0;

    return submissions;
}