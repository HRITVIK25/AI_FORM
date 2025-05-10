"use client";

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import React from 'react';

const SuccessPage = () => {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 px-4 text-center">
        <CheckCircle className="text-green-500 w-20 h-20 mb-6 animate-pulse" />

        <h1 className="text-4xl font-extrabold text-green-600 mb-4">Payment Successful</h1>

        <p className="text-lg text-gray-700 mb-8 max-w-md">
            You’ve successfully upgraded your plan! Start creating unlimited forms with advanced features now.
        </p>

        <Button
            onClick={() => router.push('/')}
            className="px-6 py-3 text-lg rounded-xl shadow-lg transition hover:scale-105"
        >
            🚀 Start Creating Forms
        </Button>
        </div>
    );
};

export default SuccessPage;
