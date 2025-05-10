import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Form } from "@/types/form";
import { getFormStats } from "@/actions/formStats";

type Props = {
    form:Form
    formId:number
};

const Analytics: React.FC<Props> = async ({ form,formId }) => {
    const data = await getFormStats(formId)
    return (
        <div>
            <Card className="w-[350px] shadow-md shadow-yellow-600">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-bold">{form.content.formTitle}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
                <p>Total submissions to your forms: {data}</p>
                <div>You can check the submissions in My Forms.</div>
            </CardContent>
            </Card>

        </div>
    );
};

export default Analytics;
