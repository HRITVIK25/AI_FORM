"use server"
import prisma from "@/lib/prisma"

export const createSubscription = async ({userId}:{userId:string}) => {
    
    const subscription = await prisma.subscription.create({
        data:{
            userId,
            subscribed:true,
            createdAt:new Date(),
            updatedAt: new Date()
        }
    });

    return subscription;
}

export const getUserSubscription = async(userId:string) => {
    // fetch subscription for givven user

    if(!userId){
        throw new Error("user not found")
    }

    const subscription = await prisma.subscription.findFirst({
        where:{
            userId:userId
        }
    });

    return  subscription?.subscribed;
}