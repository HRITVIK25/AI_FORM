/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";

type Props = {
    submission: any;
    index: number;
};

const SubmissionsDetails: React.FC<Props> = ({ submission, index }) => {
    return (
        <div className="space-y-4">
        <h1 className="font-semibold text-lg md:text-xl text-gray-800 dark:text-gray-100">
            Response {index + 1}
        </h1>
        <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-zinc-700 shadow-sm">
            <Table>
            <TableHeader className="bg-gray-100 dark:bg-zinc-800">
                <TableRow>
                <TableHead className="text-gray-700 dark:text-gray-300">
                    Question
                </TableHead>
                <TableHead className="text-gray-700 dark:text-gray-300">
                    Answer
                </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {Object.entries(submission?.content).map(
                ([key, value], index: number) => (
                    <TableRow
                    key={index}
                    className="hover:bg-gray-50 dark:hover:bg-zinc-800/60"
                    >
                    <TableCell className="text-gray-800 dark:text-gray-200 font-medium">
                        {key}
                    </TableCell>
                    <TableCell className="text-gray-700 dark:text-gray-300">
                        {Array.isArray(value)
                        ? value.join(", ")
                        : String(value)}
                    </TableCell>
                    </TableRow>
                )
                )}
            </TableBody>
            </Table>
        </div>
        </div>
    );
};

export default SubmissionsDetails;
