import React from 'react'
import prisma from '@/lib/prisma'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import AiGeneratedForm from '@/components/AiGeneratedForm'

const Edit = async ({params}:{params : Promise<{formId: string}>}) => {
    const formId  = (await params).formId

    if (!formId) {
        return <h1>No form found</h1>
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const form: any = await prisma.form.findUnique({
        where: {
            id: Number(formId)
        }
    });



return (
    <Card>
        <CardHeader>
            <CardTitle>
            <h1 className="font-bold text-2xl text-center">{form?.content.formTitle || "NA"}</h1>
            </CardTitle>
        </CardHeader>
        <CardContent>
            <AiGeneratedForm form={form} isEditMode={true} />
        </CardContent>
    </Card>
)
}

export default Edit