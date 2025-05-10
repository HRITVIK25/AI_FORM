"use server"
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server"

export const publishForm = async (formId: number) => {
    try{
        const user = await currentUser();
        if(!user){
            return {success: false, message: "Please sign in"}
        }

        if(!formId){
            return {success: false, message: "Form not found"}
        }

        const form = await prisma.form.findUnique({
            where: {
                id:formId
            }
        });

        if(!form){
            return {success: false, message: "Form not found"}
        };

        if(form.ownerId != user.id){
            return {success: false, message: "Unauthorized access"}
        } // only onwer of form can publish it

        await prisma.form.update({
            where:{
                id:formId
            },
            data:{
                publish:true
            }
        })
    } catch(error){
        console.error("Error publishing form:", error);
        return { success: false, message: "An error occurred publishing form" };
    }
}