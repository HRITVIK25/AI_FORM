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
import { useRouter } from "next/navigation";
import { getStripe } from "@/lib/stripe-client";
import { NextResponse } from "next/server";

type Props = {
    userId: string | undefined;
};

const PricingPage: React.FC<Props> = ({ userId }) => {
    const router = useRouter();
    
        const checkoutHandler = async (price: number, plan: string) => {
        
        if (!userId) {
            router.push("/sign-in");
            return;
        }
        if (price === 0) {
            return;
        }
        try {
            const { sessionId } = await fetch("/api/stripe/checkout-session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ price, userId, plan }),
            }).then((res) => res.json());
    
            const stripe = await getStripe();
            
            stripe?.redirectToCheckout({sessionId});
        } catch (error) {
                console.error("Stripe session creation error:", error);
                return NextResponse.json({ error: "Stripe session creation failed" }, { status: 500 });
        }
        
};
    return (
        <div>
        <div className="text-center mb-16">
            <h1 className="font-extrabold text-3xl">Plan and Pricing</h1>
            <p className="text-gray-500">
            Receive unlimited credits when you pay early, and save your plan.
            </p>
        </div>
        <div className="grid grid-cols-3 gap-10">
            {pricingPlan.map((plan: PricingPlan, index: number) => (
            <Card
                className={`${
                plan.level === "Enterprise" ? "bg-[#1c1c1c] text-white" : null
                } w-[350px] flex flex-col justify-between`}
                key={index}
            >
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
                <Button
                    variant={`${
                    plan.level === "Enterprise" ? "secondary" : "outline"
                    }`}
                    className="w-full"
                    onClick={() =>
                    checkoutHandler(
                        plan.level === "Pro"
                        ? 29
                        : plan.level === "Enterprise"
                        ? 70
                        : 0,
                        plan.level
                    )
                    }
                >
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
