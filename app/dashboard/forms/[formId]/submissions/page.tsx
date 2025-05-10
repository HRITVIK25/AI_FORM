import SubmissionsDetails from "@/components/SubmissionsDetails";
import prisma from "@/lib/prisma";
import React from "react";

const Submisions = async ({
    params,
    }: {
    params: Promise<{ formId: string }>;
    }) => {
    const formId = (await params).formId;


    const submissions = await prisma.submissions.findMany({
        where: {
        formId: Number(formId),
        },
        include: {
        form: true,
        },
    });

    if (!submissions || submissions.length === 0) {
        return (
        <div className="flex items-center justify-center h-[60vh] text-center px-4">
            <h1 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
            No submissions found yet :(
            </h1>
        </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Submissions for Form 
        </h1>

        {submissions.map((submission: any, index: number) => (
            <div
            key={index}
            className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-lg shadow-sm p-5 transition-all"
            >
            <SubmissionsDetails submission={submission} index={index} />
            </div>
        ))}
        </div>
    );
};

export default Submisions;
