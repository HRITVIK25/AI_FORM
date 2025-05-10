/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { publishForm } from "@/actions/publishForm";
import FormPublishDialog from "./FormPublishDialogue";
import { Form } from "@/types/form";
import { submitForm } from "@/actions/submitForm";
import toast from "react-hot-toast";

type Props = { form: Form; isEditMode: boolean };

const AiGeneratedForm: React.FC<Props> = ({ form, isEditMode }) => {
    const [successDialogueOpen, setSuccessDialogueOpen] = useState(false);
    const [formData, setFormData] = useState<any>({});

    const handleChange = (e: React.ChangeEvent<any>) => {
        const { name, type, value, checked } = e.target;
        const newValue = type === "checkbox" ? checked : value;
        setFormData((prev: any) => ({ ...prev, [name]: newValue }));
    };

    const handleRadioChange = (name: string, value: string) => {
        setFormData((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData((prev: any) => ({ ...prev, [name]: value }));
    };

    const handlePublish = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditMode) {
        await publishForm(form.id);
        setSuccessDialogueOpen(true);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = await submitForm(form.id,formData)

        if(data.success){
            toast.success(data.message)
            setFormData("")
        }

        if(!data.success){
            toast.error(data.message)
        }
    };

    const value = typeof form.content !== "object" ? JSON.parse(form.content as any) : form.content;
    const data = Array.isArray(value) ? value[0].formFields : value.formFields;

    return (
        <div className="w-full max-w-lg mx-auto p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0f0f0f] transition-colors">
        <form onSubmit={isEditMode ? handlePublish : handleSubmit}>
            {data.map((item: any, index: number) => (
            <div key={index} className="mb-5">
                <Label htmlFor={item.name} className="text-sm font-medium text-gray-800 dark:text-gray-100">
                {item.label}
                </Label>

                {item.type === "textarea" && (
                <Textarea
                    id={item.name}
                    name={item.name}
                    placeholder={item.placeholder}
                    required={!isEditMode}
                    className="mt-2 dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-400"
                    onChange={handleChange}
                    value={formData[item.name] || ""}
                />
                )}

                {["text", "email", "password", "number", "date"].includes(item.type) && (
                <Input
                    id={item.name}
                    type={item.type}
                    name={item.name}
                    placeholder={item.placeholder}
                    required={!isEditMode}
                    className="mt-2 dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-400"
                    onChange={handleChange}
                    value={formData[item.name] || ""}
                />
                )}

                {item.type === "checkbox" && (
                <div className="flex items-center gap-2 mt-2">
                    <Checkbox
                    id={item.name}
                    name={item.name}
                    checked={!!formData[item.name]}
                    onCheckedChange={(checked: boolean) =>
                        setFormData((prev: any) => ({ ...prev, [item.name]: checked }))
                    }
                    className="dark:bg-zinc-900"
                    />
                    <Label htmlFor={item.name} className="text-sm font-medium text-gray-800 dark:text-gray-100">
                    {item.label}
                    </Label>
                </div>
                )}

                {item.type === "radio" && item.options && (
                <RadioGroup
                    name={item.name}
                    value={formData[item.name] || ""}
                    onValueChange={(value) => handleRadioChange(item.name, value)}
                    className="mt-3 space-y-2"
                >
                    {item.options.map((option: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2">
                        <RadioGroupItem
                        value={option}
                        id={`${item.name}-${idx}`}
                        className="dark:bg-zinc-900"
                        />
                        <Label htmlFor={`${item.name}-${idx}`} className="text-sm text-gray-800 dark:text-gray-100">
                        {option}
                        </Label>
                    </div>
                    ))}
                </RadioGroup>
                )}

                {item.type === "select" && item.options && (
                <Select
                    defaultValue={formData[item.name] || item.options[0]}
                    onValueChange={(value) => handleSelectChange(item.name, value)}
                >
                    <SelectTrigger className="mt-2 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 dark:bg-zinc-900 dark:text-white dark:border-gray-700">
                    <SelectValue placeholder={item.placeholder || "Select..."} />
                    </SelectTrigger>
                    <SelectContent className="w-full dark:bg-zinc-900 dark:text-white dark:border-gray-700">
                    {item.options.map((option: string, idx: number) => (
                        <SelectItem
                        key={idx}
                        value={option}
                        className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-zinc-800"
                        >
                        {option}
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                )}
            </div>
            ))}
            <Button className="w-full mt-6" type="submit">
            {isEditMode ? "Publish" : "Submit"}
            </Button>
        </form>

        <FormPublishDialog
            formId={form.id}
            open={successDialogueOpen}
            onOpenChange={setSuccessDialogueOpen}
        />
        </div>
    );
};

export default AiGeneratedForm;
