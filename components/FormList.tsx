"use client"
import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card"; 
import { Button } from "./ui/button";
import { Edit2 } from "lucide-react";
import Link from "next/link";
import { Form } from "@/types/form";;
import { useRouter } from "next/navigation";
import { deleteForm } from "@/actions/deleteForm";
import toast from "react-hot-toast";

type Props = {
    form: Form;
};

const FormList: React.FC<Props> = ({ form }) => {
    const router = useRouter();

    
    const deleteFormhandler = async (formId:number) => {
        const data = await deleteForm(formId);

        if(data.success){
            toast.success(data.message)
        } else {
            toast.error(data.message)
        }

    };


    return (
        <div>
        <Card className="w-[350px]">
            <CardHeader>
            <CardTitle>{form.content.formTitle}</CardTitle>
            <CardDescription>
                Check submissions for your form.
            </CardDescription>
            </CardHeader>
            <CardContent>
            <Link href={`/dashboard/forms/${form.id}/submissions`}>
                {" "}
                <Button variant={"link"} className="text-blue-600">
                Submission - {form.submissions}
                </Button>{" "}
            </Link>
            </CardContent>
            <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={()=> router.push(`/dashboard/forms/edit/${form.id}`)}>
                <Edit2 /> Edit
            </Button>
            <Button onClick={()=> deleteFormhandler(form.id)}  variant={"destructive"}>Delete</Button>
            </CardFooter>
        </Card>
        </div>
    );
};

export default FormList;