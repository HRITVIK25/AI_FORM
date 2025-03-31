"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const PageNotFound = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null; 

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center px-4">
            <h1 className="text-6xl font-bold text-gray-800">404</h1>
            <p className="text-xl text-gray-600 mt-4">Oops! The page you are looking for does not exist.</p>
            <Link 
                href="/" 
                className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all"
            >
                Go Home
            </Link>
        </div>
    );
};

export default PageNotFound;
