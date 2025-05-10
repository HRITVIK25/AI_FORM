"use server"
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const submitForm = async (formId:number, formData:any) => {
    try {
        const user = await currentUser();

        if(!user){
            return {success:false,message:"Please sign in"}
        }


        if(!formId){
            return {success:false,message:"Form not found"}
        }

        if(!formData){
            return {success:false,message:"All fields are required"}
        }

        const form = await prisma.form.findUnique({
            where: {
                id:formId
            }
        });

        if(!form){
            return {success:false,message:"Form not found"}
        }

        await prisma.submissions.create({
            data:{
                formId,
                content: formData
            }
        })

        await prisma.form.update({
            where:{
                id:formId
            },
            data:{
                submissions:{
                    increment:1
                }
            }
        });

        return {success:true, message: "Form submitted succesfully"}

    } catch (error) {
        console.error("Error submitting form:", error);
        return { success: false, message: "An error occurred submitting form" };
    }
}