"use client";
import React from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { PricingPlan, pricingPlan } from "@/lib/pricingPlan";
import { Badge } from "./ui/badge";
import { Check } from "lucide-react";

const PricingPage = () => {
    return (
        <div>
        <div className="text-center mb-16">
            <h1 className="font-extrabold text-3xl">Plan and Pricing</h1>
            <p className="text-gray-500">
            Receive unlimited credits when you pay early, and save your plan.
            </p>
        </div>
        <div className="grid grid-cols-3 gap-6">
            {pricingPlan.map((plan: PricingPlan, index: number) => (
            <Card className={`${plan.level === "Enterprise" ? "bg-[#1c1c1c] text-white" : null} w-[350px] flex flex-col justify-between` }key={index}>
                <CardHeader className="flex flex-row items-center">
                <CardTitle>{plan.level}</CardTitle>
                {plan.level === "Pro" && (
                    <Badge className="rounded-full bg-orange-600 hover:bg-null ">
                    Popular
                    </Badge>
                )}
                </CardHeader>
                <CardContent>
                <p className="font-bold text-2xl">{plan.price}</p>
                <ul className="mt-4 space-y-2">
                    {plan.services.map((item: string, index: number) => (
                    <li className="flex items-center" key={index}>
                        <Check className="text-green-500 mr-2" />
                        {item}
                    </li>
                    ))}
                </ul>
                </CardContent>
                <CardFooter className="flex justify-between">
                <Button variant={`${plan.level === "Enterprise" ? "secondary" : "outline"}`} className="w-full">
                    Get started with {plan.level}
                </Button>
                </CardFooter>
            </Card>
            ))}
        </div>
        </div>
    );
};

export default PricingPage;
